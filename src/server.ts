import Express from 'express';
import { ApolloServer } from 'apollo-server-express';
import bodyParser from 'body-parser';
import jwt from 'express-jwt';
import User from 'models/user';
import schema from './graphql/schema';

// Server
const express = Express();
const apollo = new ApolloServer({
  schema,
  playground: process.env.NODE_ENV !== 'production',
  context: async ({ req }: { req: { user: { id: string } } }) => {
    if (!req.user) {
      return { user: null };
    }

    const user = await User.findOne({ where: { id: req.user.id } });

    if (!user) {
      return { user: null };
    }

    if (user.status !== 'ACTIVE') {
      return { user: null };
    }

    user.lastOnlineAt = new Date();
    user.save();

    return { user: { id: user.id } };
  },
});

// Middleware
express.use(bodyParser.json());
express.use(
  jwt({
    secret: `${process.env.JWT_SECRET}`,
    credentialsRequired: false,
  }),
);

// Healthcheck
express.get('/ping', (_req, res) => {
  const response = `pong ${new Date().toISOString()}`;

  console.info(response);
  res.send(response);
});

// Link Apollo with Express
apollo.applyMiddleware({ app: express, path: '/' });

// Start server on port 3001
express.listen(3001, () => {
  console.log(
    `> Application is running on http://localhost:3001${apollo.graphqlPath} 🚀`,
  );
});
