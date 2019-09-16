import { makeExecutableSchema } from 'graphql-tools';
import typeDefs from './types.graphql';
import resolvers from './resolvers';

export default makeExecutableSchema({
  typeDefs,
  resolvers,
});
