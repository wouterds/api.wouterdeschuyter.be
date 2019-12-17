FROM arm32v6/node:12-alpine
WORKDIR /code

COPY ./qemu-arm-static /usr/bin/qemu-arm-static
COPY ./package.json ./
COPY ./yarn.lock ./
COPY ./dist/server.js /code/server.js
COPY ./dist/healthcheck.js /code/healthcheck.js
COPY ./dist/sensor-sample.js /code/sensor-sample.js
COPY ./.docker/node/crons /code/crons

RUN yarn install --production

FROM arm32v6/node:12-alpine
WORKDIR /code
VOLUME /data

COPY ./qemu-arm-static /usr/bin/qemu-arm-static
COPY --from=0 /code /code
RUN crontab ./crons

EXPOSE 3001

HEALTHCHECK CMD node ./healthcheck

CMD ["./entrypoint.sh"]
