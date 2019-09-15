import Post from 'models/post';

const posts = () => {
  return Post.findAll();
};

const post = (_: any, args: { id: string }) => {
  const { id } = args;

  return Post.findOne({ where: { id } });
};

export default {
  post,
  posts,
};
