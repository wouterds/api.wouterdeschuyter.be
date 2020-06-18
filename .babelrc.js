const { readdirSync } = require('fs');

module.exports = {
  presets: [
    [
      '@babel/env',
      {
        targets: {
          node: true,
        },
      },
    ],
    '@babel/typescript',
  ],
  plugins: [
    'import-graphql',
    '@babel/plugin-proposal-optional-chaining',
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
};
