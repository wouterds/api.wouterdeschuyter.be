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

  const path = await storeFile(filename, createReadStream());

  console.log({ filename, mimetype, path });

  return null;
};

export default {
  addMediaFile,
};
