import client from "./client";
import { gql } from "apollo-boost";

const query = (qr, variables = null) => {
  const req = gql(qr);

  return new Promise((resolve, reject) => {
    client
      .query({ query: req, variables: variables })
      .then((result) => {
        resolve(result.data);
      })
      .catch((error) => {
        reject(new Error("fail"));
      });
  });
};

export default query;
