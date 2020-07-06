import PostAlias from 'models/post-alias';

const postAliases = () => {
  return PostAlias.findAll({
    include: [{ all: true, nested: true }],
    order: [['createdAt', 'desc']],
  });
};

export default {
  postAliases,
};
