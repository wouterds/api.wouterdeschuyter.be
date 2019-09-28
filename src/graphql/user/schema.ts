import { makeExecutableSchema } from 'graphql-tools';
import User from './types/user.graphql';
import Query from './types/query.graphql';
import Mutation from './types/mutation.graphql';
import resolvers from './resolvers';

export default makeExecutableSchema({
  typeDefs: [User, Query, Mutation],
  resolvers,
});
