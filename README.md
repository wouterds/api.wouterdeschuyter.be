# api.wouterdeschuyter.be

![circleci](https://circleci.com/gh/wouterds/api.wouterdeschuyter.be.svg?style=shield)
![tag](https://img.shields.io/github/tag/wouterds/api.wouterdeschuyter.be.svg)
![last commit](https://img.shields.io/github/last-commit/wouterds/api.wouterdeschuyter.be.svg)
![commit activity](https://img.shields.io/github/commit-activity/m/wouterds/api.wouterdeschuyter.be)
![code size](https://img.shields.io/github/languages/code-size/wouterds/api.wouterdeschuyter.be.svg)
![repo size](https://img.shields.io/github/repo-size/wouterds/api.wouterdeschuyter.be)

An API that powers my personal website, and maybe a bit more in the future, I'm not sure yet. It's a GraphQL API built with Nodejs and written in TypeScript using a few packages like Express, Apollo & Sequelize. Both the `develop` & `master` branch are automatically built, packaged into a Docker image & deployed with CircleCI to my Raspberry Pi at home.

## Setup

```bash
cp .env.example .env
```

## Running

```bash
docker-compose -f .docker/docker-compose-dev.yml up
```
