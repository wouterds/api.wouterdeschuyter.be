import path from 'path';
import { EnvironmentPlugin } from 'webpack';
import nodeExternals from 'webpack-node-externals';
import dotenv from 'dotenv';

export default {
  mode: 'production',
  target: 'node',
  externals: [nodeExternals()],
  entry: {
    server: './src/server.ts',
  },
  output: { path: path.resolve(__dirname, './dist') },
  resolve: { extensions: ['.json', '.ts'] },
  module: {
    rules: [
      {
        test: /\.json$/,
        exclude: /node_modules/,
        use: [{ loader: 'json-loader' }],
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [{ loader: 'babel-loader' }],
      },
    ],
  },
  plugins: [
    new EnvironmentPlugin(
      Object.keys(dotenv.config({ path: '.env.example' }).parsed || {})
    ),
  ],
};
