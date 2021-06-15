import { User } from "./types";

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
  last_name: "McLastName",
  email: "oopsie@whoops.oops"
};
