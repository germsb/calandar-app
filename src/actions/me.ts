import { query } from "../api";
import loginuser from "../store";

export const me = () => {
  query(`query{me{username}}`).then((login) => {
    loginuser.value = login["me"] ? true : false;
  });
};
