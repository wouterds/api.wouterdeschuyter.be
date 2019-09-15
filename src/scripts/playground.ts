import { generateSalt, hashPassword } from 'services/password';

console.log('---- test script ----');

const user = { email: 'wouter.de.schuyter@gmail.com', password: 'azerty123' };
const salt = generateSalt(user.email);
const hashedPassword = hashPassword(user.password, salt);

console.log({
  ...user,
  salt,
  hashedPassword,
});

process.exit(0);
