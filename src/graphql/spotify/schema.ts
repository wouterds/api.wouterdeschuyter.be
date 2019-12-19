import { makeExecutableSchema } from 'graphql-tools';
import Song from './types/song.graphql';
import Query from './types/query.graphql';
import Mutation from './types/mutation.graphql';
import resolvers from './resolvers';

export default makeExecutableSchema({
  typeDefs: [Song, Query, Mutation],
  resolvers,
});
