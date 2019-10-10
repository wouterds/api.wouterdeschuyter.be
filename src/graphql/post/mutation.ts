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

const increaseViewCount = async (_parent: any, args: { id: string }) => {
  const { id } = args;
  const post = await Post.findOne({ where: { id } });

  if (!post) {
    return false;
  }

  post.views++;
  post.save();
  return true;
};

export default {
  addPost,
  increaseViewCount,
};
