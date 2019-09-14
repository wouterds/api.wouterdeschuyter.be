import { mergeTypes } from 'merge-graphql-schemas';
import Post from './post/schema.graphql';
import Sensor from './sensor/schema.graphql';

export default mergeTypes([Post, Sensor]);
