import Media from 'models/media';

const media = (_parent: any, args: { id: string }) => {
  const { id } = args;

  return Media.findOne({ where: { id } });
};

export default {
  media,
};
