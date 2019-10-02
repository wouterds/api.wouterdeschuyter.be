import { Op } from 'sequelize';
import Post from 'models/post';

const posts = () => {
  return Post.findAll({
    include: ['user'],
    where: { publishedAt: { [Op.ne]: null } },
  });
};

const post = (_parent: any, args: { id: string }) => {
  const { id } = args;

  return Post.findOne({ where: { id }, include: ['user'] });
};

export default {
  post,
  posts,
};
