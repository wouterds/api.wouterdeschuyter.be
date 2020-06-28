# api.wouterdeschuyter.be

![version](https://img.shields.io/github/v/tag/wouterds/api.wouterdeschuyter.be?color=orange&label=version)
![release](https://github.com/wouterds/api.wouterdeschuyter.be/workflows/release/badge.svg)
![linting](https://github.com/wouterds/api.wouterdeschuyter.be/workflows/linting/badge.svg)
![dependencies](https://img.shields.io/david/wouterds/api.wouterdeschuyter.be)
![node image](https://img.shields.io/docker/image-size/wouterds/api.wouterdeschuyter.be/node?label=node%20image)

A GraphQL API that powers my personal website, and maybe a bit more in the future, I'm not sure yet. It's built with Nodejs and written in TypeScript using a few packages like Express, Apollo & Sequelize.

## Running

```bash
docker-compose -f .docker/docker-compose.dev.yml up
```

## Setup

```bash
cp .env.example .env
```

### VSCode

#### Plugins

- https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint

#### Workspace settings

```javascript
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true,
  },
  "eslint.validate": [
    "javascript", "typescript",
  ],
}
```
