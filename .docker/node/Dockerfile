FROM node:12-slim

WORKDIR /code

COPY ./package*.json ./
RUN npm install --production

COPY ./dist /code

FROM node:12-alpine

WORKDIR /code

COPY --from=0 /code /code

EXPOSE 3000

CMD ["npm", "start"]
