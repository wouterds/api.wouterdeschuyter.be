import Post from './post';

export default {
  Query: {
    ...Post.Query,
  },
  Mutation: {
    ...Post.Mutation,
  },
};
