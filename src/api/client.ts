import ApolloClient from "apollo-boost";
import { InMemoryCache } from "apollo-cache-inmemory";
import { persistCache } from "apollo-cache-persist";

const cache = new InMemoryCache();

persistCache({
  cache,
  debug: process.env.NODE_ENV !== "production",
  storage: window.localStorage,
});

const getGQL = new ApolloClient({
  uri: "https://deluge.titeya.com/graphql",
  fetchOptions: {
    credentials: "include",
  },
  request: async (operation) => {
    const token = "";
    operation.setContext({
      headers: {
        authorization: token,
      },
    });
  },
  onError: ({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      console.log(graphQLErrors);
      // sendToLoggingService(graphQLErrors);
    }
    if (networkError) {
      // logoutUser();
      console.log("logout");
    }
  },
  clientState: {
    defaults: {
      isConnected: true,
    },
    resolvers: {
      Mutation: {
        updateNetworkStatus: (_, { isConnected }, { cache }) => {
          cache.writeData({ data: { isConnected } });
          return null;
        },
      },
    },
  },
  // cacheRedirects: {
  //   Query: {
  //     shop: (_, { id }, { getCacheKey }) =>
  //       getCacheKey({ __typename: "shop", id }),
  //   },
  // },
});

export default getGQL;
