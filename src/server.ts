import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import bodyParser from 'body-parser';
import schema from './graphql/schema';

const server = new ApolloServer({
  schema,
  playground: process.env.NODE_ENV !== 'production',
});

const app = express();

app.use(bodyParser.json());
server.applyMiddleware({ app });

// Hello world on root
app.get('/', (_req, res) =>
  res.send(`Hello world! ${new Date().toISOString()}`)
);

app.listen(3000, () => {
  console.log(
    `> Application is running on http://localhost:3000${server.graphqlPath} 🚀`
  );
});
