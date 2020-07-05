import PostAlias from 'models/post-alias';

const postAliases = async (
  _parent: any,
  args: { limit?: number; offset?: number; includeDrafts?: boolean },
) => {
  const { limit, offset } = args;

  return PostAlias.findAll({
    include: [{ all: true, nested: true }],
    order: [['createdAt', 'desc']],
    limit,
    offset,
  });
};

export default {
  postAliases,
};
