import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: process.env.GATEWAY_URL || "http://localhost:3333/graphql",
  cache: new InMemoryCache(),
});

export default client;
