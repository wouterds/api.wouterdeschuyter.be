import { resolve, join } from 'path';
import { createWriteStream, unlinkSync, existsSync, mkdirSync } from 'fs';

export const storeFile = async (
  location: string,
  rs: NodeJS.ReadableStream
): Promise<string | null> => {
  const path = join(resolve('/data'), location);
  const ws = createWriteStream(path);

  // Create parent directory
  const parts = path.split('/');
  parts.pop();
  mkdirSync(parts.join('/'), { recursive: true });

  return new Promise(resolve => {
    const abort = () => {
      if (existsSync(path)) {
        unlinkSync(path);
      }

      resolve(null);
    };

    rs.on('error', abort);
    ws.on('error', abort);
    ws.on('finish', () => resolve(path));
    rs.pipe(ws);
  });
};
