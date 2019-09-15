import Express from 'express';
import { ApolloServer } from 'apollo-server-express';
import bodyParser from 'body-parser';
import schema from './graphql/schema';

// Server
const express = Express();
const apollo = new ApolloServer({
  schema,
  playground: process.env.NODE_ENV !== 'production',
});

// Middleware
express.use(bodyParser.json());
apollo.applyMiddleware({ app: express });

// Hello world
express.get('/', (_req, res) =>
  res.send(`Hello world! ${new Date().toISOString()}`)
);

// Start server on port 3000
express.listen(3000, () => {
  console.log(
    `> Application is running on http://localhost:3000${apollo.graphqlPath} 🚀`
  );
});
