import Post from 'models/post';

type Args = {
  userId: string;
  mediaId: string;
  title: string;
  slug: string;
  excerpt: string;
  body: string;
};

const addPost = (_parent: any, args: Args) => {
  const { userId, mediaId, title, slug, excerpt, body } = args;

  return Post.create({ userId, mediaId, title, slug, excerpt, body });
};

export default {
  addPost,
};
