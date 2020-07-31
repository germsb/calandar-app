import client from "./client";
import { gql } from "apollo-boost";

const query = (qr) => {
  const req = gql(qr);

  return new Promise((resolve) => {
    client.query({ query: req }).then((result) => {
      resolve(result.data);
    });
  });
};

export default query;
