import { mergeSchemas } from 'graphql-tools';
import media from './media/schema';
import post from './post/schema';
import sensor from './sensor/schema';
import user from './user/schema';

export default mergeSchemas({
  schemas: [media, post, sensor, user],
});
