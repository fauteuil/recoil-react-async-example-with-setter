import { atom, selector, selectorFamily } from "recoil";
import { User } from "./types";
import { getUsers } from "./service";
import { defaultUser } from "./configuration";

export const selectedUserState = atom<User>({
  key: "selectedUserState",
  default: defaultUser
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
    const selectedUserId = get(selectedUserState);
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
 * The selectors with which the UI components interact
 * weill reference this atom.
 */
const userListInternalState = atom<User[]>({
  key: "userListInternalState",
  default: []
});

/**
 * This is the selector the UI components will use to display state.
 * When `selectedUserIdState` is updated,
 * the service request in `allUsersState.get()` will be called,
 * which will then update `userListState`
 * and trigger a redraw of any UI Components that
 * consume `userListState`.
 */
export const userListState = selector<User[]>({
  key: "userListState",
  get: ({ get }) => {
    const internalState = get(userListInternalState);
    if (internalState.length) {
      return internalState;
    }
    return get(allUsersState);
    // [
    // { first_name: "whoops", last_name: "oops", email: "oopsie@whoops.oops" }
    // ];
  },
  set: ({ get, set }, newValue) => {
    set(userListInternalState, newValue);
  }
});
