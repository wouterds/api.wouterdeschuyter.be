import { Request, Response } from 'express';
import { getFile } from 'functions/storage';
import MediaAsset from 'models/media-asset';
import { extname } from 'path';
import sharp from 'sharp';

// https://github.com/lovell/sharp/blob/master/docs/install.md#alpine-linux
sharp.cache(false);

export default async (req: Request, res: Response) => {
  const { id, ext } = req.params;
  const { embed, thumbnail } = req.query;

  const mediaAsset = await MediaAsset.findOne({ where: { id } });

  if (!mediaAsset) {
    res.sendStatus(404);
    return;
  }

  const { path, mediaType } = mediaAsset;

  if (!path || !mediaType) {
    res.sendStatus(404);
    return;
  }

  if (`.${ext}` !== extname(path)) {
    res.sendStatus(400);
    return;
  }

  res.header('content-type', mediaType);

  if (embed === 'true' && mediaType.includes('image')) {
    getFile(path)
      .pipe(sharp().resize(1200, 630, { fit: sharp.fit.cover }).jpeg())
      .pipe(res);
    return;
  }

  if (thumbnail === 'true' && mediaType.includes('image')) {
    getFile(path)
      .pipe(sharp().resize(200, 150, { fit: sharp.fit.cover }).jpeg())
      .pipe(res);
    return;
  }

  getFile(path).pipe(res);
};
