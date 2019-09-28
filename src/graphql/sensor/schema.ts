import { makeExecutableSchema } from 'graphql-tools';
import Sensor from './types/sensor.graphql';
import Query from './types/query.graphql';
import resolvers from './resolvers';

export default makeExecutableSchema({
  typeDefs: [Sensor, Query],
  resolvers,
});
