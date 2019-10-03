import { Op } from 'sequelize';
import Post from 'models/post';

const posts = (_parent: any, args: { limit?: number }) => {
  const { limit } = args;

  return Post.findAll({
    include: ['user'],
    order: [['publishedAt', 'desc']],
    where: { publishedAt: { [Op.ne]: null } },
    limit,
  });
};

const post = (_parent: any, args: { id: string }) => {
  const { id } = args;

  return Post.findOne({ where: { id }, include: ['user'] });
};

const postCount = () => {
  return Post.count({
    where: { publishedAt: { [Op.ne]: null } },
  });
};

export default {
  post,
  posts,
  postCount,
};
