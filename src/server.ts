import { ApolloServer } from 'apollo-server-express';
import express, { json, Request } from 'express';
import jwt from 'express-jwt';
import User, { UserStatus } from 'models/user';

import schema from './graphql/schema';
import requestHandlers from './request-handlers';

export interface GraphqlContext {
  user: { id: string } | null;
  ip: string;
  userAgent: string;
}

const app = express();
app.disable('x-powered-by');

const apollo = new ApolloServer({
  schema,
  playground: process.env.NODE_ENV !== 'production',
  context: async ({ req }: { req: Request & { user: { id?: string } } }) => {
    const ip = `${req.get('cf-connecting-ip') || req.connection.remoteAddress}`;
    const userAgent = `${req.get('user-agent')}`;

    const context: GraphqlContext = {
      user: null,
      ip,
      userAgent,
    };

    if (!req?.user?.id) {
      return context;
    }

    const user = await User.findOne({ where: { id: req.user.id } });
    if (!user) {
      return context;
    }

    if (user.status !== UserStatus.Active) {
      return context;
    }

    user.lastOnlineAt = new Date();
    user.save();

    context.user = { id: user.id };

    return context;
  },
});

// Middleware
app.use(json());
app.use(
  jwt({
    secret: `${process.env.JWT_SECRET}`,
    algorithms: ['HS256'],
    credentialsRequired: false,
  }),
);

// Healthcheck
app.get('/ping', requestHandlers.ping);
app.get('/media-assets/:id.:ext', requestHandlers.mediaAsset);

// Link Apollo with Express
apollo.applyMiddleware({ app: app, path: '/' });

// Start server on port 3001
app.listen(3001, () => {
  console.log(
    `> Application is running on http://localhost:3001${apollo.graphqlPath} 🚀`,
  );
});
