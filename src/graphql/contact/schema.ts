import { makeExecutableSchema } from 'graphql-tools';
import Query from './types/query.graphql';
import Mutation from './types/mutation.graphql';
import resolvers from './resolvers';

export default makeExecutableSchema({
  typeDefs: [Query, Mutation],
  resolvers,
});
