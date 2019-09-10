import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';

const typeDefs = gql`
    type Query {
      hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => 'Hello world!',
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
server.applyMiddleware({ app });

app.listen(3000, () => {
  console.log(`> Application is running on http://localhost:3000${server.graphqlPath} 🚀`);
});
