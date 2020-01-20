FROM node:12-alpine
WORKDIR /code

COPY ./package.json ./package.json
COPY ./yarn.lock ./yarn.lock
COPY ./dist/server.js ./server.js
COPY ./dist/healthcheck.js ./healthcheck.js
COPY ./dist/sensor-sample.js ./sensor-sample.js
COPY ./dist/status-led-dimmer.js ./status-led-dimmer.js
COPY ./.docker/node/crons ./crons
COPY ./.docker/node/entrypoint.sh ./entrypoint.sh

RUN yarn install --production

FROM node:12-alpine
WORKDIR /code
VOLUME /data

COPY --from=0 /code /code

RUN crontab ./crons

EXPOSE 3001

HEALTHCHECK CMD ["node", "./healthcheck.js"]

CMD ["./entrypoint.sh"]
