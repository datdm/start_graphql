import { ApolloServer, gql } from "apollo-server-express";
import axios from "axios";
import express from "express";
import expressPlayground from "graphql-playground-middleware-express";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";

const typeDefs = gql`
  type User {
    id: ID
    login: String
    avatar_url: String
  }

  type Query {
    users: [User]
  }
`

const resolvers = {
  Query: {
    users: async () => {
      try {
        const users = await axios.get("https://api.github.com/users")
        return users.data.map(({ id, login, avatar_url }) => ({
          id,
          login,
          avatar_url,
        }))
      } catch (error) {
        throw error
      }
    },
  },
}

const app = express();
const graphQLPlayground = expressPlayground.default;

async function startServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    playground: true,
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
  });
  
  await server.start();
  server.applyMiddleware({ app, path: '/graphql' });
}
startServer();

app.get("/graphql-ui", graphQLPlayground({ endpoint: '/graphql' }))

app.listen({ port: 4001 }, () =>
  console.log(`🚀 Server ready at http://localhost:4001`)
);