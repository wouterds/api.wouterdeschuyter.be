# api.wouterdeschuyter.be

![release](https://github.com/wouterds/api.wouterdeschuyter.be/workflows/release/badge.svg)
![linting](https://github.com/wouterds/api.wouterdeschuyter.be/workflows/linting/badge.svg)
![dependencies](https://img.shields.io/david/wouterds/api.wouterdeschuyter.be)
![tag](https://img.shields.io/github/tag/wouterds/api.wouterdeschuyter.be.svg)
![repo size](https://img.shields.io/github/repo-size/wouterds/api.wouterdeschuyter.be)

A GraphQL API that powers my personal website, and maybe a bit more in the future, I'm not sure yet. It's built with Nodejs and written in TypeScript using a few packages like Express, Apollo & Sequelize.

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
    "source.fixAll.eslint": true
  },
  "eslint.validate": [
    "javascript", "typescript"
  ],
}
```

## Running

```bash
docker-compose -f .docker/docker-compose.dev.yml up
```
