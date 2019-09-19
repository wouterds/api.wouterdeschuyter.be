import { resolve, join } from 'path';
import { createWriteStream, unlinkSync, existsSync } from 'fs';

export const storeFile = async (
  location: string,
  rs: NodeJS.ReadableStream
): Promise<string | null> => {
  const path = join(resolve('/data'), location);
  const ws = createWriteStream(path);

  return new Promise(resolve => {
    rs.on('error', () => {
      if (existsSync(path)) {
        unlinkSync(path);
      }

      resolve(null);
    });

    ws.on('error', () => {
      if (existsSync(path)) {
        unlinkSync(path);
      }

      resolve(null);
    });

    ws.on('finish', () => resolve(path));
    rs.pipe(ws);
  });
};
