import { mutation } from "../api";
import { me } from "./me";
import { error } from "../store";

export const login = (email, password) => {
  mutation(
    `mutation login($email: String!, $password: String!){ login(email: $email, password:$password) { token }}`,
    { email: email, password: password }
  )
    .then((result) => {
      me();
    })
    .catch((er) => {
      error.value = true;
    });
};
