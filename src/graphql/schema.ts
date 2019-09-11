import path from 'path';
import { fileLoader, mergeTypes } from 'merge-graphql-schemas';

export default mergeTypes(fileLoader(path.join(__dirname, '**/*.graphql')));
