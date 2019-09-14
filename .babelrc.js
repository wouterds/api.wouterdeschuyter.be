const { readdirSync } = require('fs');

module.exports = {
  presets: ['@babel/typescript'],
  plugins: [
    'import-graphql',
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
