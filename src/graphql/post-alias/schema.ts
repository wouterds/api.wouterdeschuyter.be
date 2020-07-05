import { makeExecutableSchema } from 'graphql-tools';

import MediaAsset from '../media-asset/types/media-asset.graphql';
import Post from '../post/types/post.graphql';
import User from '../user/types/user.graphql';
import resolvers from './resolvers';
import PostAlias from './types/post-alias.graphql';
import Query from './types/query.graphql';

export default makeExecutableSchema({
  typeDefs: [Post, User, MediaAsset, PostAlias, Query],
  resolvers,
});
