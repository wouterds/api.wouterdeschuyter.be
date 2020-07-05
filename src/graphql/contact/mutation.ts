import Mail from 'services/mail';

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

  return Mail.send({
    sender: {
      name: `Website (${name})`,
      email: 'no-reply@wouterdeschuyter.be',
    },
    receiver: {
      name: 'Wouter De Schuyter',
      email: 'wouter.de.schuyter@gmail.com',
    },
    replyTo: { name, email },
    subject: `[Contact] ${subject}`,
    text: message,
  });
};

export default {
  contact,
};
