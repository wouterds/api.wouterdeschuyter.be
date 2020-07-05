import { parse } from 'useragent';

export const cleanUserAgent = (input: string): string => {
  const agent = parse(input);
  let userAgent = agent.toAgent();

  const os = agent.os.toString();
  if (os) {
    userAgent += ` (${agent.os.toString()})`;
  }

  return userAgent;
};
