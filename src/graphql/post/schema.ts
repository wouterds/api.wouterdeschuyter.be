import { makeExecutableSchema } from 'graphql-tools';
import User from '../user/types/user.graphql';
import MediaAsset from '../media-asset/types/media-asset.graphql';
import Post from './types/post.graphql';
import Query from './types/query.graphql';
import Mutation from './types/mutation.graphql';
import resolvers from './resolvers';

export default makeExecutableSchema({
  typeDefs: [Post, User, MediaAsset, Query, Mutation],
  resolvers,
});
