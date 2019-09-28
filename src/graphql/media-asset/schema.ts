import { makeExecutableSchema } from 'graphql-tools';
import Upload from '../upload/types/upload.graphql';
import uploadResolvers from '../upload/resolvers';
import MediaAsset from './types/media-asset.graphql';
import Query from './types/query.graphql';
import Mutation from './types/mutation.graphql';
import resolvers from './resolvers';

export default makeExecutableSchema({
  typeDefs: [Upload, MediaAsset, Query, Mutation],
  resolvers: [uploadResolvers, resolvers],
});
