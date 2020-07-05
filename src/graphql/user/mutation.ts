import { format as formatDate } from 'date-fns';
import { cleanUserAgent } from 'functions/user-agent';
import hasha from 'hasha';
import AuthenticationRequest from 'models/authentication-request';
import User from 'models/user';
import { GraphqlContext } from 'server';
import Mail, { SystemSender } from 'services/mail';
import validator from 'validator';

const authRequestValidForMinutes = 10;

const createAuthenticationRequest = async (
  _parent: any,
  args: { email: string },
  context: GraphqlContext,
) => {
  const { email } = args;
  const { userAgent, ip } = context;
  const cleanedUserAgent = cleanUserAgent(userAgent);
  const when = `${formatDate(new Date(), 'd MMMM, yyyy HH:mm')} UTC`;

  if (!validator.isEmail(email)) {
    throw new Error('invalid email');
  }

  const user =
    (await User.findOne({ where: { email } })) ||
    (await User.create({ email }));

  const token = hasha(`${user.id}${new Date().getTime()}`, {
    algorithm: 'sha256',
  });

  await AuthenticationRequest.create({
    token,
    userId: user.id,
    userAgent,
    ip,
  });

  const link = `${process.env.APP_URL}/auth/${token}`;

  const subject = 'Authentication request';
  let text = '';
  text += 'Hi,\n\n';
  text += `You may sign in with the link below. It's valid for the next ${authRequestValidForMinutes} minutes and can be used only once.\n`;
  text += link;
  text += '\n\n';
  text += `When: ${when}\n`;
  text += `Device: ${cleanedUserAgent}\n`;
  text += `IP: ${ip}\n\n`;
  text += '- wouterdeschuyter.be';

  await Mail.send({
    sender: SystemSender,
    receiver: { email },
    subject,
    text,
  });

  return true;
};

const consomeAuthenticationRequest = async () => {
  return '';
};

export default {
  createAuthenticationRequest,
  consomeAuthenticationRequest,
};
