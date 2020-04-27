import { makeExecutableSchema } from 'graphql-tools';

import MediaAsset from '../media-asset/types/media-asset.graphql';
import User from '../user/types/user.graphql';
import resolvers from './resolvers';
import Mutation from './types/mutation.graphql';
import Post from './types/post.graphql';
import Query from './types/query.graphql';

export default makeExecutableSchema({
  typeDefs: [Post, User, MediaAsset, Query, Mutation],
  resolvers,
});
