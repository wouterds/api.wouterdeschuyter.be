import dotenv from 'dotenv';
import path from 'path';
import { EnvironmentPlugin } from 'webpack';
import nodeExternals from 'webpack-node-externals';

export default {
  mode: 'production',
  target: 'node',
  externals: [nodeExternals()],
  entry: {
    server: './src/server.ts',
    healthcheck: './src/scripts/healthcheck.ts',
    'sensor-sample': './src/scripts/sensor-sample.ts',
    'status-led-dimmer': './src/scripts/status-led-dimmer.ts',
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
      Object.keys(dotenv.config({ path: '.env.example' }).parsed || {}),
    ),
  ],
};
