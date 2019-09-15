import jsonwebtoken from 'jsonwebtoken';
import User from 'models/user';
import { generateSalt, hashPassword } from 'services/password';

const signIn = async (
  _: any,
  args: {
    email: string;
    password: string;
  }
): Promise<string> => {
  const { email, password } = args;

  const user = await User.findOne({ where: { email } });

  if (!user) {
    throw new Error('user not found');
  }

  if (user.password !== hashPassword(password, user.salt)) {
    throw new Error('password invalid');
  }

  return jsonwebtoken.sign({ id: user.id }, `${process.env.JWT_SECRET}`, {
    expiresIn: '1m',
  });
};

const signUp = async (
  _: any,
  args: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }
): Promise<string> => {
  const { firstName, lastName, email, password } = args;

  if ((await User.count({ where: { email } })) > 0) {
    throw new Error('email already in use');
  }

  const salt = generateSalt(email);
  const hashedPassword = hashPassword(password, salt);

  const { id } = await User.create({
    firstName,
    lastName,
    email,
    password: hashedPassword,
    salt,
  });

  return jsonwebtoken.sign({ id }, `${process.env.JWT_SECRET}`, {
    expiresIn: '1m',
  });
};

export default {
  signIn,
  signUp,
};
