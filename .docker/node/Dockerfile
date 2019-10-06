FROM arm32v6/node:12-alpine
WORKDIR /code

COPY ./qemu-arm-static /usr/bin/qemu-arm-static
COPY ./package*.json ./
COPY ./dist/server.js /code/server.js
COPY ./dist/healthcheck.js /code/healthcheck.js

RUN yarn install --production --ignore-scripts

FROM arm32v6/node:12-alpine
WORKDIR /code
VOLUME /data

COPY --from=0 /code /code

EXPOSE 3001

HEALTHCHECK CMD node ./healthcheck

CMD ["npm", "start"]
