import { Request, Response } from 'express';

export default (_req: Request, res: Response) => {
  const response = `pong ${new Date().toISOString()}`;

  console.info(response);
  res.send(response);
};
