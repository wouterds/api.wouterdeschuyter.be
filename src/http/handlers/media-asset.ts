import { extname } from 'path';
import { Request, Response } from 'express';
import statuses from 'statuses';
import MediaAsset from 'models/media-asset';
import { getFile } from 'services/storage';

export default async (req: Request, res: Response) => {
  const { id, ext } = req.params;

  const mediaAsset = await MediaAsset.findOne({ where: { id } });

  if (!mediaAsset) {
    res.sendStatus(statuses('not found'));
    return;
  }

  const { path, size, mediaType } = mediaAsset;

  if (`.${ext}` !== extname(path)) {
    res.sendStatus(statuses('bad request'));
    return;
  }

  res.header('content-type', mediaType);
  res.header('content-length', size);
  getFile(path).pipe(res);
};
