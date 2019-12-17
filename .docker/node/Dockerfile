FROM arm32v6/node:12-alpine
WORKDIR /code

COPY ./qemu-arm-static /usr/bin/
COPY ./package.json ./
COPY ./yarn.lock ./
COPY ./dist/server.js ./
COPY ./dist/healthcheck.js ./
COPY ./dist/sensor-sample.js ./
COPY ./.docker/node/crons ./
COPY ./.docker/node/entrypoint.sh ./

RUN yarn install --production

FROM arm32v6/node:12-alpine
WORKDIR /code
VOLUME /data

COPY ./qemu-arm-static /usr/bin/
COPY --from=0 /code ./
RUN crontab ./crons

EXPOSE 3001

HEALTHCHECK CMD node ./healthcheck

CMD ["./entrypoint.sh"]
