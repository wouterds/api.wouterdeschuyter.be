import {
  createReadStream,
  createWriteStream,
  existsSync,
  mkdirSync,
  statSync,
  unlinkSync,
} from 'fs';
import { join, resolve } from 'path';

export const saveFile = async (
  location: string,
  rs: NodeJS.ReadableStream,
): Promise<string | null> => {
  const path = join(resolve('/data'), location);
  const ws = createWriteStream(path);

  // Create parent directory
  const parts = path.split('/');
  parts.pop();
  mkdirSync(parts.join('/'), { recursive: true });

  return new Promise((resolve) => {
    const abort = () => {
      if (existsSync(path)) {
        unlinkSync(path);
      }

      resolve(null);
    };

    rs.on('error', abort);
    ws.on('error', abort);
    ws.on('finish', () => {
      ws.end();
      resolve(path);
    });
    rs.pipe(ws);
  });
};

export const getFile = (location: string): NodeJS.ReadableStream => {
  const path = join(resolve('/data'), location);

  return createReadStream(path);
};

export const getFileSize = (location: string): number => {
  const path = join(resolve('/data'), location);

  return statSync(path).size;
};
