import { makeExecutableSchema } from 'graphql-tools';

import resolvers from './resolvers';
import Query from './types/query.graphql';
import Sensor from './types/sensor.graphql';

export default makeExecutableSchema({
  typeDefs: [Sensor, Query],
  resolvers,
});
