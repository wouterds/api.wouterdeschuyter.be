import Post from 'models/post';

const posts = () => {
  return Post.findAll({ include: ['user'] });
};

const post = (_parent: any, args: { id: string }) => {
  const { id } = args;

  return Post.findOne({ where: { id }, include: ['user'] });
};

export default {
  post,
  posts,
};
