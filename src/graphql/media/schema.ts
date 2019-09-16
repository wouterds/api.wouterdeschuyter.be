import { makeExecutableSchema } from 'graphql-tools';
import typeDefs from './types.graphql';
import resolvers from './resolvers';
import uploadTypeDefs from 'graphql/upload/types.graphql';
import uploadResolvers from 'graphql/upload/resolvers';

export default makeExecutableSchema({
  typeDefs: [typeDefs, uploadTypeDefs],
  resolvers: [resolvers, uploadResolvers],
});
