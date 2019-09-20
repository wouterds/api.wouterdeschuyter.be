import MediaAsset from 'models/media-asset';

const mediaAssets = () => {
  return MediaAsset.findAll();
};

const mediaAsset = (_parent: any, args: { id: string }) => {
  const { id } = args;

  return MediaAsset.findOne({ where: { id } });
};

export default {
  mediaAssets,
  mediaAsset,
};
