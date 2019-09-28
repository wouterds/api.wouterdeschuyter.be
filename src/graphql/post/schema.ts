import { makeExecutableSchema } from 'graphql-tools';
import Post from './types/post.graphql';
import Query from './types/query.graphql';
import Mutation from './types/mutation.graphql';
import resolvers from './resolvers';

export default makeExecutableSchema({
  typeDefs: [Post, Query, Mutation],
  resolvers,
});
