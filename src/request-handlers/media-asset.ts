import { Request, Response } from 'express';
import MediaAsset from 'models/media-asset';
import { extname } from 'path';
import { getFile } from 'services/storage';

export default async (req: Request, res: Response) => {
  const { id, ext } = req.params;
  const { embed } = req.query;

  const mediaAsset = await MediaAsset.findOne({ where: { id } });

  if (!mediaAsset) {
    res.sendStatus(404);
    return;
  }

  const { path, size, mediaType } = mediaAsset;

  if (`.${ext}` !== extname(path)) {
    res.sendStatus(400);
    return;
  }

  if (embed === 'true') {
    // resize image
  }

  res.header('content-type', mediaType);
  res.header('content-length', size);
  getFile(path).pipe(res);
};
