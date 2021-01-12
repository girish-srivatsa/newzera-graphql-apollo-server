const { GraphQLServerLambda } = require("graphql-yoga");
import { ApolloServer } from "apollo-server";

var fs = require("fs");
const path = require("path");

const typeDefs = fs
  .readFileSync(path.resolve("./types/bio.gql"))
  .toString("utf-8");

const resolvers = {
  Query: {
    getUserDetails: require("../resolvers/query").func,
  },
  Mutation: {
    addProfilePicture: require("../resolvers/mutation").func,
  },
};

const lambda = new GraphQLServerLambda({
  typeDefs,
  resolvers,
});
const server = new ApolloServer({
  typeDefs: typeDefs,
  resolvers: resolvers,
});
export default server;
