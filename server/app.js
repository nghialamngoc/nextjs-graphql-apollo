const express = require("express");
const { ApolloServer } = require("apollo-server-express");

// Load schema & resolvers
const typeDefs = require("./schema/schema");
const resolvers = require("./resolver/resolver");

const app = express();
let apolloServer = null;

async function startServer() {
  apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({
    app,
  });
}

startServer();

app.listen(
  {
    port: 4000,
  },
  () => {
    console.log("Server ready at port 4000");
    console.log(`gql path is ${apolloServer.graphqlPath}`);
  }
);
