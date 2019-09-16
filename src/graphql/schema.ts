import { mergeSchemas } from 'graphql-tools';
import media from './media';
import post from './post';
import sensor from './sensor';
import user from './user';

export default mergeSchemas({
  schemas: [media.schema, post.schema, sensor.schema, user.schema],
  resolvers: {
    Query: {
      ...media.resolver.Query,
      ...post.resolver.Query,
      ...sensor.resolver.Query,
      ...user.resolver.Query,
    },
    Mutation: {
      ...media.resolver.Mutation,
      ...post.resolver.Mutation,
      ...sensor.resolver.Mutation,
      ...user.resolver.Mutation,
    },
  },
});
