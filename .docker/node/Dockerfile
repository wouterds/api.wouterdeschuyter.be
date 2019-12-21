FROM arm32v6/node:12-alpine
WORKDIR /code

COPY ./package.json ./package.json
COPY ./yarn.lock ./yarn.lock
COPY ./dist/server.js ./server.js
COPY ./dist/healthcheck.js ./healthcheck.js
COPY ./dist/sensor-sample.js ./sensor-sample.js
COPY ./.docker/node/crons ./crons
COPY ./.docker/node/entrypoint.sh ./entrypoint.sh
COPY ./qemu-arm-static /usr/bin/qemu-arm-static

RUN yarn install --production

FROM arm32v6/node:12-alpine
WORKDIR /code
VOLUME /data

COPY --from=0 /code /code
COPY ./qemu-arm-static /usr/bin/qemu-arm-static

RUN crontab ./crons

EXPOSE 3001

HEALTHCHECK CMD node ./healthcheck

CMD ["./entrypoint.sh"]
