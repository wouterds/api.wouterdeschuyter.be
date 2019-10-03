import { Op } from 'sequelize';
import Post from 'models/post';

const posts = (_parent: any, args: { limit?: number; offset?: number }) => {
  const { limit, offset } = args;

  return Post.findAll({
    include: ['user'],
    order: [['publishedAt', 'desc']],
    where: { publishedAt: { [Op.ne]: null } },
    limit,
    offset,
  });
};

const post = (_parent: any, args: { id: string }) => {
  const { id } = args;

  return Post.findOne({
    where: { id, publishedAt: { [Op.ne]: null } },
    include: ['user'],
  });
};

const postBySlug = (_parent: any, args: { slug: string }) => {
  const { slug } = args;

  return Post.findOne({
    where: { slug, publishedAt: { [Op.ne]: null } },
    include: ['user'],
  });
};

const postCount = () => {
  return Post.count({
    where: { publishedAt: { [Op.ne]: null } },
  });
};

export default {
  post,
  postBySlug,
  posts,
  postCount,
};
