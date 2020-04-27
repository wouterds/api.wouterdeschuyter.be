import {
  copyFileSync,
  createReadStream,
  existsSync,
  mkdirSync,
  readdirSync,
  statSync,
} from 'fs';
import hasha from 'hasha';
import { imageSize } from 'image-size';
import { extname, join, resolve } from 'path';
import { v4 as uuidv4 } from 'uuid';

(async () => {
  const userId = process.argv[2];
  const source = resolve(__dirname, process.argv[3]);
  const target = join(source, './_processed');
  if (!existsSync(target)) {
    mkdirSync(target);
  }

  let query =
    'INSERT INTO `media-assets` (`id`, `userId`, `name`, `mediaType`, `size`, `width`, `height`, `md5`, `path`, `createdAt`, `updatedAt`) VALUES ';

  let i = 0;
  for (const file of readdirSync(source)) {
    const ext = extname(file);
    if (!['.jpg', '.gif', '.png'].includes(ext)) {
      continue;
    }

    let mimeType = 'image/jpeg';
    if (ext === '.gif') {
      mimeType = 'image/gif';
    }
    if (ext === '.png') {
      mimeType = 'image/png';
    }

    const path = join(source, file);
    const size = statSync(path).size;
    const { width, height } = imageSize(path);
    const id = uuidv4();
    const md5 = await hasha.fromStream(createReadStream(path), {
      algorithm: 'md5',
    });

    copyFileSync(path, join(target, `${id}${ext}`));

    if (i++ > 0) {
      query += ',';
    }

    query += '(';
    query += `'${id}',`;
    query += `'${userId}',`;
    query += `'${file}',`;
    query += `'${mimeType}',`;
    query += `${size},`;
    query += `${width},`;
    query += `${height},`;
    query += `'${md5}',`;
    query += `'/media-assets/${id}${ext}',`;
    query += 'NOW(),';
    query += 'NOW()';
    query += ')';
  }
  query += ';';

  console.log(query);

  process.exit(0);
})();
