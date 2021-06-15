import { atom, selector } from "recoil";
import { User } from "./types";
import { getUsers } from "./service";
import { defaultBlankUser } from "./configuration";

export const selectedUserState = atom<User>({
  key: "selectedUserState",
  default: defaultBlankUser
});

/**
 * Populate the default selector return value with a service call.
 */
export const userServiceRequestState = selector<User[]>({
  key: "userServiceRequestState",
  get: async ({ get }) => {
    try {
      const response = await getUsers();
      return response.data || [];
    } catch (error) {
      console.error(`userServiceRequestState -> getUsers() ERROR: \n${error}`);
      return [];
    }
  }
});

// This atom is used by components to get and set app data.
export const userListStateAdd = atom<User[]>({
  key: "userListStateAdd",
  default: userServiceRequestState
});

// This atom is used by components to get and set app data.
export const userListStateEdit = atom<User[]>({
  key: "userListStateEdit",
  default: userServiceRequestState
});
