import Post from 'models/post';

const addPost = (
  _parent: any,
  args: {
    mediaAssetId: string;
    title: string;
    slug: string;
    excerpt: string;
    body: string;
  },
  context: { user?: { id: string } },
) => {
  const { user } = context;

  if (!user) {
    throw new Error('not authenticated');
  }

  const { mediaAssetId, title, slug, excerpt, body } = args;

  return Post.create({
    userId: user.id,
    mediaAssetId,
    title,
    slug,
    excerpt,
    body,
  });
};

export default {
  addPost,
};
