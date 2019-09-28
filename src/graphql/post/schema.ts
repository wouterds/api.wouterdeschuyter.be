import { makeExecutableSchema } from 'graphql-tools';
import User from '../user/types/user.graphql';
import Post from './types/post.graphql';
import Query from './types/query.graphql';
import Mutation from './types/mutation.graphql';
import resolvers from './resolvers';

export default makeExecutableSchema({
  typeDefs: [Post, User, Query, Mutation],
  resolvers,
});
