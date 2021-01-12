import { InMemoryCache } from "apollo-cache-inmemory";
import ApolloClient from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import fetch from "node-fetch";
import { onError } from "apollo-link-error";

const errorLink = onError(({ graphQLErrors }) => {
  if (graphQLErrors) graphQLErrors.map(({ message }) => console.log(message));
});

const PORT = 3000;
const URL = `http://localhost:${PORT}`;
const cache = new InMemoryCache({
  addTypename: false,
});
const link = new createHttpLink({
  uri: "http://localhost:3000",
  fetch,
});

const client = new ApolloClient({
  cache: cache,
  link: link,
});

export default client;
