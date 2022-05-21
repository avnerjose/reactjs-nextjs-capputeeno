import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: "https://rocketseat-frontend-challenge.herokuapp.com/",
  cache: new InMemoryCache(),
});
