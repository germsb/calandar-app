import ApolloClient from "apollo-boost";

const getGQL = new ApolloClient({
  uri: "https://deluge.titeya.com/graphql",
  credentials: "include",
  fetchOptions: {
    credentials: "include",
  },
  onError: ({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach(async (err) => {
        console.log(`[GraphQL error]: ${err}`);
      });
    }
    if (networkError) {
      console.log(`[Network error]: ${networkError}`);
    }
  },
});

export default getGQL;
