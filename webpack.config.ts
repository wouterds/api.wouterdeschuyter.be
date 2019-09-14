import path from 'path';
import { Configuration, EnvironmentPlugin } from 'webpack';
import nodeExternals from 'webpack-node-externals';
import dotenv from 'dotenv';

const extensions = ['.json', '.ts'];

const config: Configuration = {
  mode: 'production',
  target: 'node',
  externals: [nodeExternals()],
  entry: {
    server: './src/server.ts',
  },
  output: {
    path: path.resolve(__dirname, './dist'),
  },
  resolve: { extensions },
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

export default config;
