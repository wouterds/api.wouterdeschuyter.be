import { mergeSchemas } from 'graphql-tools';
import contact from './contact/schema';
import mediaAsset from './media-asset/schema';
import post from './post/schema';
import sensor from './sensor/schema';
import user from './user/schema';

export default mergeSchemas({
  schemas: [contact, mediaAsset, post, sensor, user],
});
