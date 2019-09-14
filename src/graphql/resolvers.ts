import Post from './post';
import Sensor from './sensor';

export default {
  Query: {
    ...Post.Query,
    ...Sensor.Query,
  },
  Mutation: {
    ...Post.Mutation,
    ...Sensor.Mutation,
  },
};
