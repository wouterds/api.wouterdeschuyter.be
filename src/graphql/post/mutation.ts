import Post from 'models/post';

const addPost = (
  _parent: any,
  args: {
    userId: string;
    mediaId: string;
    title: string;
    slug: string;
    excerpt: string;
    body: string;
  },
  context: { user?: { id: string } }
) => {
  const { user } = context;

  if (!user) {
    throw new Error('unauthorized');
  }

  const { userId, mediaId, title, slug, excerpt, body } = args;

  return Post.create({ userId, mediaId, title, slug, excerpt, body });
};

export default {
  addPost,
};
