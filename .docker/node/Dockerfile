FROM arm32v6/node:12-alpine
WORKDIR /code

COPY ./qemu-arm-static /usr/bin/qemu-arm-static
COPY ./package*.json ./
COPY ./dist/server.js /code/server.js
COPY ./dist/healthcheck.js /code/healthcheck.js

RUN npm install --production --ignore-scripts

FROM arm32v6/node:12-alpine
WORKDIR /code

COPY --from=0 /code /code

EXPOSE 3000

HEALTHCHECK CMD node ./healthcheck

CMD ["npm", "start"]
