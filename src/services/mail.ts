import mailjet from 'node-mailjet';

const instance = mailjet.connect(
  `${process.env.MAILJET_API_KEY}`,
  `${process.env.MAILJET_API_SECRET}`,
);

type Person = {
  name?: string;
  email: string;
};
type Receiver = Person & {
  userId?: string;
};
type Sender = Person;
type ReplyTo = Person;
type Attachment = {
  contentType: string;
  fileName: string;
  data: string; // base64
};

interface SendOptions {
  sender: Sender;
  receiver: Receiver;
  replyTo?: ReplyTo;
  subject: string;
  text: string;
  html?: string;
  attachments?: Attachment[];
}

const send = async (options: SendOptions) => {
  const {
    sender,
    receiver,
    replyTo = null,
    subject: Subject,
    text: TextPart,
    html: HTMLPart,
    attachments,
  } = options;

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
    Subject,
    TextPart,
    HTMLPart,
  };

  if (replyTo) {
    message.ReplyTo = {
      Name: replyTo.name,
      Email: replyTo.email,
    };
  }

  if (attachments) {
    attachments.forEach((attachment) => {
      if (!message.Attachments) {
        message.Attachments = [];
      }

      message.Attachments.push({
        ContentType: attachment.contentType,
        Filename: attachment.fileName,
        Base64Content: attachment.data,
      });
    });
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

export const System = {
  name: `${process.env.MAIL_SENDER_NAME}`,
  email: `${process.env.MAIL_SENDER_EMAIL}`,
};

const MailService = {
  send,
};

export default MailService;
