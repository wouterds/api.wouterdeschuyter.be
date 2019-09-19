import { extname } from 'path';
import hasha from 'hasha';
import uuid from 'uuid';
import Media from 'models/media';
import { storeFile, fileSize } from 'services/storage';

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
  const extension = extname(filename);

  const searchMedia = await Media.findOne({ where: { md5 } });
  if (searchMedia) {
    return searchMedia;
  }

  const id = uuid();
  const location = `/media/${id}${extension}`;
  const path = await storeFile(location, stream);
  const size = fileSize(location);

  return Media.create({
    id,
    name: filename,
    mediaType: mimetype,
    size,
    md5,
    path,
  });
};

export default {
  addMediaFile,
};
