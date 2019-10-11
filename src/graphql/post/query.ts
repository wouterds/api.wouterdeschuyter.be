import { Op } from 'sequelize';
import Post from 'models/post';

const postCount = () => {
  return Post.count({
    where: { publishedAt: { [Op.ne]: null } },
  });
};

const post = (
  _parent: any,
  args: { id?: string; slug?: string },
  context: { user?: { id: string } },
) => {
  const { id, slug } = args;
  const { user } = context;

  if (!id && !slug) {
    return null;
  }

  const where: any = user ? {} : { publishedAt: { [Op.ne]: null } };

  if (id) {
    where.id = id;
  }

  if (slug) {
    where.slug = slug;
  }

  return Post.findOne({ where, include: ['user', 'mediaAsset'] });
};

const posts = (_parent: any, args: { limit?: number; offset?: number }) => {
  const { limit, offset } = args;

  return Post.findAll({
    include: ['user', 'mediaAsset'],
    order: [['publishedAt', 'desc']],
    where: { publishedAt: { [Op.ne]: null } },
    limit,
    offset,
  });
};

export default {
  postCount,
  post,
  posts,
};
