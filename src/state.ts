import { atom, selector, selectorFamily } from "recoil";
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
export const allUsersState = selector<User[]>({
  key: "allUsersState",
  get: async ({ get }) => {
    // Referencing another state element (atom) creates a dependency:
    // Any change to the value of `selectedUserIdState` will cause
    // the service request to be made again.
    // const selectedUserId = get(selectedUserState);
    try {
      const response = await getUsers();
      // console.log("getUsers called...");
      return response.data || [];
    } catch (error) {
      console.error(`allUsersState -> getUsers() ERROR: \n${error}`);
      return [];
    }
  }
});

/**
 * This is the atom in which state will be stored.
 * The selectors consumed by the UI components
 * will reference this atom.
 */
export const userListState = atom<User[]>({
  key: "userListState",
  default: allUsersState
});
