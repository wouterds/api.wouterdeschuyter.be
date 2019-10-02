import { sendMail } from 'services/mail';

const contact = (
  _parent: any,
  args: {
    name: string;
    email: string;
    subject: string;
    message: string;
  },
) => {
  const { name, email, subject, message } = args;

  return sendMail(
    { name: `Website (${name})`, email: 'no-reply@wouterdeschuyter.be' },
    { name: 'Wouter De Schuyter', email: 'wouter.de.schuyter@gmail.com' },
    { name, email },
    `[Contact] ${subject}`,
    message,
  );
};

export default {
  contact,
};
