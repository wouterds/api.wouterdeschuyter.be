import { config as dotenv } from 'dotenv';
import { register as tsconfigPaths } from 'tsconfig-paths';
import tsconfig from './../tsconfig.json';

dotenv();

tsconfigPaths({
  baseUrl: tsconfig.compilerOptions.baseUrl,
  paths: tsconfig.compilerOptions.paths,
});
