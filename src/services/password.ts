import crypto from 'crypto';

export const generateSalt = (salt?: string): string => {
  return crypto
    .createHmac('sha256', `${salt}${Math.random()}${new Date().toISOString()}`)
    .digest('hex');
};
