import { mergeSchemas } from 'graphql-tools';
import post from './post';
import sensor from './sensor';
import user from './user';

export default mergeSchemas({
  schemas: [post.schema, sensor.schema, user.schema],
  resolvers: {
    Query: {
      ...post.resolver.Query,
      ...sensor.resolver.Query,
      ...user.resolver.Query,
    },
    Mutation: {
      ...post.resolver.Mutation,
      ...sensor.resolver.Mutation,
      ...user.resolver.Mutation,
    },
  },
});
