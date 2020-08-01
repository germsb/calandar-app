import ApolloClient from "apollo-boost";

const getGQL = new ApolloClient({
  uri: "https://deluge.titeya.com/graphql",
  credentials: "include",
  fetchOptions: {
    credentials: "include",
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
