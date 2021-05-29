import { User } from "./types";

/**
 * We generate a quasi-random URL to show that
 * when the service is called, changes in the results
 * will cause our Recoil app state to be synchronized.
 */
export const getUserApiUrl = () =>
  `https://reqres.in/api/users?page=${Math.max(
    1,
    Math.round(Math.random()) * 2
  )}`;

export const userListApiUrl = "https://reqres.in/api/users?page=2";

export const createUserApiUrl =
  "https://run.mocky.io/v3/0b6cd52b-3a7b-4c84-9330-97110086526a";

export const defaultBlankUser: User = {
  first_name: "",
  last_name: "",
  email: ""
};
export const defaultNewUser: User = {
  first_name: "",
  last_name: "oops",
  email: "oopsie@whoops.oops"
};
