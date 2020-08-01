import client from "./client";
import { gql } from "apollo-boost";

const mutation = (request, variables = null) => {
  const mutation = gql(request);

  return new Promise((resolve, reject) => {
    client
      .mutate({ mutation, variables: variables })
      .then((result) => {
        resolve(result.data);
      })
      .catch((error) => {
        reject(new Error("fail"));
      });
  });
};

export default mutation;
