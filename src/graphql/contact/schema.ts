import { makeExecutableSchema } from 'graphql-tools';

import resolvers from './resolvers';
import Mutation from './types/mutation.graphql';
import Query from './types/query.graphql';

export default makeExecutableSchema({
  typeDefs: [Query, Mutation],
  resolvers,
});
