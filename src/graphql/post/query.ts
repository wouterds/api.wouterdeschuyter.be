import Post from 'models/post';
import PostAlias from 'models/post-alias';
import { Op } from 'sequelize';

const postCount = () => {
  return Post.count({
    where: { publishedAt: { [Op.ne]: null } },
  });
};

const post = async (
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

  const post = await Post.findOne({ where, include: ['user', 'mediaAsset'] });
  if (post) {
    return post;
  }

  if (!slug) {
    return null;
  }

  const postAlias = await PostAlias.findOne({
    where: { slug },
    include: ['post'],
  });
  if (!postAlias) {
    return null;
  }

  return postAlias.post;
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
