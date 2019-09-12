FROM arm32v6/node:12-alpine
WORKDIR /code

COPY ./qemu-arm-static /usr/bin/qemu-arm-static
COPY ./package*.json ./
COPY ./dist /code

RUN npm install --production --ignore-scripts

FROM arm32v6/node:12-alpine
WORKDIR /code

COPY --from=0 /code /code

EXPOSE 3000

CMD ["npm", "start"]
