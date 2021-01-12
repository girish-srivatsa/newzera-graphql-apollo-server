const { GraphQLServerLambda } = require("graphql-yoga");
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

module.exports.server = lambda.graphqlHandler;
module.exports.playground = lambda.playgroundHandler;
