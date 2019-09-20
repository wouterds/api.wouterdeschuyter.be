import { mergeSchemas } from 'graphql-tools';
import mediaAsset from './media-asset/schema';
import post from './post/schema';
import sensor from './sensor/schema';
import user from './user/schema';

export default mergeSchemas({
  schemas: [mediaAsset, post, sensor, user],
});
