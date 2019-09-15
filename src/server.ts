import Express from 'express';
import { ApolloServer } from 'apollo-server-express';
import bodyParser from 'body-parser';
import jwt from 'express-jwt';
import schema from './graphql/schema';

// Server
const express = Express();
const apollo = new ApolloServer({
  schema,
  playground: process.env.NODE_ENV !== 'production',
  context: ({ req }: { req: { user: { id: string } } }) => ({
    user: req.user || null,
  }),
});

// Middleware
express.use(bodyParser.json());
express.use(
  jwt({
    secret: `${process.env.JWT_SECRET}`,
    credentialsRequired: false,
  })
);

// Healthcheck
express.get('/ping', (_req, res) => {
  const response = `pong ${new Date().toISOString()}`;

  console.info(response);
  res.send(response);
});

// Link Apollo with Express
apollo.applyMiddleware({ app: express, path: '/' });

// Start server on port 3000
express.listen(3000, () => {
  console.log(
    `> Application is running on http://localhost:3000${apollo.graphqlPath} 🚀`
  );
});
