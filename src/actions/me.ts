import { query } from "../api";
import { loginuser, error } from "../store";

export const me = (err = false) => {
  if (err) {
    error.value = true;
  } else {
    query(`query{me{username}}`).then((login) => {
      loginuser.value = login["me"] ? true : false;
    });
  }
};
