import client from "./client";
import { gql } from "apollo-boost";

const mutation = (request, variables = null) => {
  const mutation = gql(request);

  return new Promise((resolve) => {
    client.mutate({ mutation, variables: variables }).then((result) => {
      resolve(result.data);
    });
  });
};

export default mutation;
