import { makeExecutableSchema } from 'graphql-tools';

import resolvers from './resolvers';
import Query from './types/query.graphql';
import User from './types/user.graphql';

export default makeExecutableSchema({
  typeDefs: [User, Query],
  resolvers,
});
