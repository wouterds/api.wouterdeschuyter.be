import { getFileSize, saveFile } from 'functions/storage';
import hasha from 'hasha';
import { imageSize } from 'image-size';
import MediaAsset from 'models/media-asset';
import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';

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

  const id = uuidv4();
  const path = `/media-assets/${id}${extension}`;
  const fsPath = await saveFile(path, createReadStream());

  if (!fsPath) {
    throw new Error('could not save file');
  }

  const size = getFileSize(path);
  let width = null,
    height = null;

  if (mimetype.indexOf('image/') > -1) {
    const dimensions = imageSize(fsPath);
    width = dimensions.width;
    height = dimensions.height;
  }

  return MediaAsset.create({
    id,
    name: filename,
    mediaType: mimetype,
    size,
    width,
    height,
    md5,
    path,
  });
};

export default {
  addMediaAssetFile,
};
