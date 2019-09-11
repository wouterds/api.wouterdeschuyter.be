import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import resolvers from 'graphql/resolvers';
import typeDefs from 'graphql/schema';

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
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
