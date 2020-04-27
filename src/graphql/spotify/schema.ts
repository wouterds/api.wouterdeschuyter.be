import { makeExecutableSchema } from 'graphql-tools';

import resolvers from './resolvers';
import Mutation from './types/mutation.graphql';
import Query from './types/query.graphql';
import Song from './types/song.graphql';

export default makeExecutableSchema({
  typeDefs: [Song, Query, Mutation],
  resolvers,
});
