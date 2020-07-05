import Post from 'models/post';
import PostAlias from 'models/post-alias';
import { Op } from 'sequelize';
import { GraphqlContext } from 'server';

const postCount = () => {
  return Post.count({
    where: { publishedAt: { [Op.ne]: null } },
  });
};

const post = async (
  _parent: any,
  args: { id?: string; slug?: string },
  context: GraphqlContext,
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

const posts = (
  _parent: any,
  args: { limit?: number; offset?: number; includeDrafts?: boolean },
  context: GraphqlContext,
) => {
  const { limit, offset, includeDrafts } = args;

  const where: any = {};
  if (!(includeDrafts && context.user)) {
    where.publishedAt = { [Op.ne]: null };
  }

  return Post.findAll({
    include: ['user', 'mediaAsset'],
    order: [['publishedAt', 'desc']],
    where,
    limit,
    offset,
  });
};

export default {
  postCount,
  post,
  posts,
};
