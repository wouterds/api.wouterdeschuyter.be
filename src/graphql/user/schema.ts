import { makeExecutableSchema } from 'graphql-tools';

import resolvers from './resolvers';
import Mutation from './types/mutation.graphql';
import Query from './types/query.graphql';
import User from './types/user.graphql';

export default makeExecutableSchema({
  typeDefs: [User, Query, Mutation],
  resolvers,
});
