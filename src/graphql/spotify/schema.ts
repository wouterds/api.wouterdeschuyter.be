import { makeExecutableSchema } from 'graphql-tools';
import Song from './types/song.graphql';
import Query from './types/query.graphql';
import resolvers from './resolvers';

export default makeExecutableSchema({
  typeDefs: [Song, Query],
  resolvers,
});
