import path from 'path';
import { Configuration } from 'webpack';
import nodeExternals from 'webpack-node-externals';

const config: Configuration = {
  mode: 'production',
  entry: './src/server.ts',
  output: {
    filename: './server.js',
    path: path.resolve(__dirname, './dist'),
  },
  externals: [nodeExternals()],
};

export default config;
