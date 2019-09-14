import { mergeSchemas } from 'graphql-tools';
import post from './post';
import sensor from './sensor';

export default mergeSchemas({
  schemas: [post.schema, sensor.schema],
  resolvers: {
    Query: {
      ...post.resolver.Query,
      ...sensor.resolver.Query,
    },
    Mutation: {
      ...post.resolver.Mutation,
      ...sensor.resolver.Mutation,
    },
  },
});
