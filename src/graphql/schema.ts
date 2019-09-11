import { mergeTypes } from 'merge-graphql-schemas';
import Post from './post/schema.graphql';

export default mergeTypes([Post]);
