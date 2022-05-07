# Config graphql server

## 👍 Install dependencies

```bash
npm install apollo-server-core
npm install apollo-server-express
npm install express
npm install graphql
npm install graphql-playground-middleware-express
```

## 👍 Config
### File `app.js`
```javascript
import { ApolloServer, gql } from "apollo-server-express";
import express from "express";
import expressPlayground from "graphql-playground-middleware-express";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";

// Define type
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

// Define query
const resolvers = {
  Query: {
    users: async () => {
      try {
        return [
          {
            id,
            login,
            avatar_url,
          }
        ]
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
```