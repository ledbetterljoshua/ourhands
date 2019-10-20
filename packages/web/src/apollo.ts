import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";

export const client = new ApolloClient({
  link: new HttpLink({
    uri: "http://localhost:4000",
    credentials: "include"
  }),
  cache: new InMemoryCache(),
  resolvers: {
    Mutation: {
      upvotePost: (parent, data, { cache }) => {
        console.log(parent, data);
        // const data = { visibilityFilter, __typename: "Filter" };
        // cache.writeData({ data });
      }
    }
  }
});
