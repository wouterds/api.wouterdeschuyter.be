import path from 'path';
import { Configuration, EnvironmentPlugin } from 'webpack';
import { readdirSync } from 'fs';
import nodeExternals from 'webpack-node-externals';
import dotenv from 'dotenv';

const extensions = ['.json', '.graphql', '.ts'];

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
        test: /\.graphql$/,
        exclude: /node_modules/,
        use: [{ loader: 'graphql-tag/loader' }],
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              plugins: [
                [
                  'module-resolver',
                  {
                    root: ['./src'],
                    alias: readdirSync('./src', { withFileTypes: true })
                      .filter(dirent => dirent.isDirectory())
                      .map(dirent => dirent.name)
                      .reduce(
                        (res, item) => ({
                          ...res,
                          [item]: `./src/${item}`,
                        }),
                        {}
                      ),
                  },
                ],
              ],
            },
          },
        ],
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
