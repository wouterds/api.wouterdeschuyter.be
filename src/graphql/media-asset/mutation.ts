import { extname } from 'path';
import hasha from 'hasha';
import uuid from 'uuid';
import MediaAsset from 'models/media-asset';
import { saveFile, getFileSize } from 'services/storage';

const addMediaAssetFile = async (
  _parent: any,
  args: {
    file: Promise<{
      filename: string;
      mimetype: string;
      createReadStream: () => NodeJS.ReadableStream;
    }>;
  },
  context: { user?: { id: string } },
) => {
  const { user } = context;

  if (!user) {
    throw new Error('not authenticated');
  }

  const { file } = args;
  const { filename, mimetype, createReadStream } = await file;

  const md5 = await hasha.fromStream(createReadStream(), { algorithm: 'md5' });
  const extension = extname(filename);

  const searchMedia = await MediaAsset.findOne({ where: { md5 } });
  if (searchMedia) {
    if (searchMedia.deletedAt) {
      searchMedia.deletedAt = null;
      searchMedia.save();
    }

    return searchMedia;
  }

  const id = uuid();
  const path = `/media-assets/${id}${extension}`;
  await saveFile(path, createReadStream());
  const size = getFileSize(path);

  return MediaAsset.create({
    id,
    name: filename,
    mediaType: mimetype,
    size,
    md5,
    path,
  });
};

export default {
  addMediaAssetFile,
};
