import hasha from 'hasha';

export const generateSalt = (salt?: string): string => {
  return hasha(`${salt}${Math.random()}${new Date().toISOString()}`, {
    algorithm: 'sha256',
  });
};

export const hashPassword = (
  password: string,
  salt: string,
  cycles: number = 10
): string => {
  for (let i = 0; i < cycles; i++) {
    password = hasha(`${salt}:${password}`, { algorithm: 'sha256' });
  }

  return password;
};
