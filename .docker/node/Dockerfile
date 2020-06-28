FROM node:14-alpine
WORKDIR /code

COPY ./package.json ./package.json
COPY ./yarn.lock ./yarn.lock
COPY ./dist/server.js ./server.js
COPY ./dist/healthcheck.js ./healthcheck.js
COPY ./dist/sensor-sample.js ./sensor-sample.js
COPY ./dist/status-led-dimmer.js ./status-led-dimmer.js
COPY ./dist/backfill-blurhash.js ./backfill-blurhash.js
COPY ./.docker/node/crons ./crons
COPY ./.docker/node/entrypoint.sh ./entrypoint.sh

RUN apk add build-base vips-dev --upgrade --no-cache \
    --repository https://alpine.global.ssl.fastly.net/alpine/edge/community/ \
    --repository https://alpine.global.ssl.fastly.net/alpine/edge/main

RUN yarn install --production

FROM node:14-alpine
WORKDIR /code
VOLUME /data

COPY --from=0 /code /code

RUN apk add vips --upgrade --no-cache \
    --repository https://alpine.global.ssl.fastly.net/alpine/edge/community/ \
    --repository https://alpine.global.ssl.fastly.net/alpine/edge/main

RUN crontab ./crons

EXPOSE 3001

HEALTHCHECK CMD ["node", "./healthcheck.js"]

CMD ["./entrypoint.sh"]
