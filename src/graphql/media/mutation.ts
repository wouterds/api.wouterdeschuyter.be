import path from 'path';
import hasha from 'hasha';
import uuid from 'uuid';
import Media from 'models/media';
import { storeFile } from 'services/storage';

const addMediaFile = async (
  _parent: any,
  args: {
    file: Promise<{
      filename: string;
      mimetype: string;
      createReadStream: () => NodeJS.ReadableStream;
    }>;
  },
  context: { user?: { id: string } }
) => {
  const { user } = context;

  if (!user) {
    throw new Error('not authenticated');
  }

  const { file } = args;
  const { filename, mimetype, createReadStream } = await file;

  const stream = createReadStream();
  const md5 = await hasha.fromStream(stream, { algorithm: 'md5' });
  const extension = path.extname(filename);

  const searchMedia = await Media.findOne({ where: { md5 } });
  if (searchMedia) {
    return searchMedia;
  }

  const id = uuid();
  const location = `/media/${id}${extension}`;
  const storagePath = await storeFile(location, stream);

  console.log({ filename, mimetype, id, md5, extension, storagePath });

  return null;
};

export default {
  addMediaFile,
};
