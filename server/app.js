const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const mongoose = require("mongoose");

// Load mongo data methods
const mogoDataMethods = require("./data/db");

// Load schema & resolvers
const typeDefs = require("./schema/schema");
const resolvers = require("./resolver/resolver");

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://admin:aa5pUhTAwKAx50j6@qraphqldemo.tltln6h.mongodb.net/?retryWrites=true&w=majority`
    );

    console.log("MongoDB connected!");
  } catch (err) {
    console.log(err.message);
    process.exit();
  }
};

connectDB();

const app = express();
let apolloServer = null;

async function startServer() {
  apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => ({ mogoDataMethods }),
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
