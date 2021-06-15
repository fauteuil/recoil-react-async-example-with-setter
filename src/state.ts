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
    // Referencing another state element (atom) creates a dependency:
    // Any change to the value of `selectedUserIdState` will cause
    // the service request to be made again.
    // const selectedUserId = get(selectedUserState);
    try {
      const response = await getUsers();
      return response.data || [];
    } catch (error) {
      console.error(`userServiceRequestState -> getUsers() ERROR: \n${error}`);
      return [];
    }
  }
});

export const userListStateAdd = atom<User[]>({
  key: "userListStateAdd",
  default: userServiceRequestState
});

export const userListStateEdit = atom<User[]>({
  key: "userListStateEdit",
  default: userServiceRequestState
});
