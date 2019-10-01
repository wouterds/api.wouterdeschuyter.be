import { extname } from 'path';
import { Request, Response } from 'express';
import statuses from 'statuses';
import MediaAsset from 'models/media-asset';

export default async (req: Request, res: Response) => {
  const { id, ext } = req.params;

  const mediaAsset = await MediaAsset.findOne({ where: { id } });

  if (!mediaAsset) {
    res.sendStatus(statuses('not found'));
    return;
  }

  if (`.${ext}` !== extname(mediaAsset.path)) {
    res.sendStatus(statuses('bad request'));
    return;
  }

  console.log({ 'mediaAsset.path': mediaAsset.path, id, ext });

  res.sendStatus(204);
};
