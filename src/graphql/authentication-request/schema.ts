import { makeExecutableSchema } from 'graphql-tools';

import User from '../user/types/user.graphql';
import resolvers from './resolvers';
import AuthenticationRequest from './types/authentication-request.graphql';
import Query from './types/query.graphql';

export default makeExecutableSchema({
  typeDefs: [User, AuthenticationRequest, Query],
  resolvers,
});
