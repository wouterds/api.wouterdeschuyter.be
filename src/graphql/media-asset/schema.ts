import { makeExecutableSchema } from 'graphql-tools';

import uploadResolvers from '../upload/resolvers';
import Upload from '../upload/types/upload.graphql';
import resolvers from './resolvers';
import MediaAsset from './types/media-asset.graphql';
import Mutation from './types/mutation.graphql';
import Query from './types/query.graphql';

export default makeExecutableSchema({
  typeDefs: [Upload, MediaAsset, Query, Mutation],
  resolvers: [uploadResolvers, resolvers],
});
