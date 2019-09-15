import crypto from 'crypto';

export const generateSalt = (salt?: string): string => {
  return crypto
    .createHmac('sha256', `${salt}${Math.random()}${new Date().toISOString()}`)
    .digest('hex');
};

export const hashPassword = (
  password: string,
  salt: string,
  cycles: number = 10
): string => {
  for (let i = 0; i < cycles; i++) {
    password = crypto.createHmac('sha256', `${salt}:${password}`).digest('hex');
  }

  return password;
};
