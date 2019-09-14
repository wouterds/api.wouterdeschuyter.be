import { mergeTypes } from 'merge-graphql-schemas';
import { makeExecutableSchema } from 'graphql-tools';
import post from './post';
import sensor from './sensor';

export default makeExecutableSchema({
  typeDefs: mergeTypes([post.schema, sensor.schema]),
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
