import { mutation } from "../api";
import { me } from "./me";

export const login = () => {
  mutation(
    `mutation{login(email:"titeya.nb@gmail.com", password:"test") {token}}`
  ).then((result) => {
    me();
  });
};
