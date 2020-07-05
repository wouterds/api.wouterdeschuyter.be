import { mergeSchemas } from 'graphql-tools';

import contact from './contact/schema';
import mediaAsset from './media-asset/schema';
import postAlias from './post-alias/schema';
import post from './post/schema';
import sensor from './sensor/schema';
import spotify from './spotify/schema';
import user from './user/schema';

export default mergeSchemas({
  schemas: [contact, mediaAsset, post, postAlias, sensor, user, spotify],
});
