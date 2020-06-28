import { Request, Response } from 'express';
import MediaAsset from 'models/media-asset';
import { extname } from 'path';
import { getFile } from 'services/storage';
import sharp from 'sharp';

// https://github.com/lovell/sharp/blob/master/docs/install.md#alpine-linux
sharp.cache(false);

export default async (req: Request, res: Response) => {
  const { id, ext } = req.params;
  const { embed } = req.query;

  const mediaAsset = await MediaAsset.findOne({ where: { id } });

  if (!mediaAsset) {
    res.sendStatus(404);
    return;
  }

  const { path, mediaType } = mediaAsset;

  if (`.${ext}` !== extname(path)) {
    res.sendStatus(400);
    return;
  }

  res.header('content-type', mediaType);

  if (embed === 'true' && mediaType.contains('image')) {
    getFile(path)
      .pipe(sharp().resize(1200, 630, { fit: sharp.fit.cover }).jpeg())
      .pipe(res);
    return;
  }

  getFile(path).pipe(res);
};
