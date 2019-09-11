import path from 'path';
import { Configuration } from 'webpack';
import nodeExternals from 'webpack-node-externals';

const config: Configuration = {
  mode: 'production',
  entry: {
    server: './src/server.ts',
  },
  output: {
    path: path.resolve(__dirname, './dist'),
  },
  externals: [nodeExternals()],
  resolve: {
    extensions: ['.ts'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [{ loader: 'babel-loader' }, { loader: 'ts-loader' }],
      },
    ],
  },
};

export default config;
