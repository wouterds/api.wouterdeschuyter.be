import mailjet from 'node-mailjet';

const instance = mailjet.connect(
  `${process.env.MAILJET_API_KEY}`,
  `${process.env.MAILJET_API_SECRET}`,
);

interface Person {
  name: string;
  email: string;
}

type Receiver = Person;
type Sender = Person;
type ReplyTo = Person;

export const sendMail = async (
  sender: Sender,
  receiver: Receiver,
  replyTo: ReplyTo | null = null,
  subject: string,
  text: string,
) => {
  const message: any = {
    From: {
      Name: sender.name,
      Email: sender.email,
    },
    To: [
      {
        Name: receiver.name,
        Email: receiver.email,
      },
    ],
    Subject: subject,
    TextPart: text,
  };

  if (replyTo) {
    message.ReplyTo = {
      Name: replyTo.name,
      Email: replyTo.email,
    };
  }

  try {
    await instance.post('send', { version: 'v3.1' }).request({
      Messages: [message],
    });
    return true;
  } catch {
    return false;
  }
};
