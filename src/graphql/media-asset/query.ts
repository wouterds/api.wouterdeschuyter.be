import MediaAsset from 'models/media-asset';

const mediaAssets = (_parent: any, args: { ids?: string[] }) => {
  const { ids } = args;

  if (ids) {
    return MediaAsset.findAll({
      where: { id: ids },
      order: [['createdAt', 'desc']],
    });
  }

  return MediaAsset.findAll({ order: [['createdAt', 'desc']] });
};

const mediaAsset = (_parent: any, args: { id: string }) => {
  const { id } = args;

  return MediaAsset.findOne({ where: { id } });
};

export default {
  mediaAssets,
  mediaAsset,
};
