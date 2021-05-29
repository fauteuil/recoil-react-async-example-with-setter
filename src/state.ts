import { atom, selector, selectorFamily } from "recoil";
import { User } from "./types";
import { getUsers, mockCreateUser, mockUpdateUser } from "./service";
import { defaultBlankUser, defaultNewUser } from "./configuration";

export const selectedUserState = atom<User>({
  key: "selectedUserState",
  default: defaultBlankUser
});

const addUserInternalState = atom<User | null>({
  key: "addUserInternalState",
  default: null
});

export const updateUserInternalState = atom<User | null>({
  key: "updateUserInternalState",
  default: null
});

/**
 * Populate the default selector return value with a service call.
 */
export const userServiceRequestState = selector<User[]>({
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
// export const userListState = atom<User[]>({
//   key: "userListState",
//   default: allUsersState
// });

export const userListState = selector<User[]>({
  key: "userListState",
  get: async ({ get }) => {
    const newUser = get(addUserInternalState);

    // If there's a new user, make the addUser API service call.
    if (newUser) {
      try {
        const response = await mockCreateUser(newUser as User);
        console.log("userListState calling createUser() - response:", response);

        // Set the app userListState for the list with our updated list.
        return response;
      } catch (error) {
        console.error(`userListState -> createUser() ERROR: \n${error}`);
        return [];
      }
    }

    const updatedUser = get(updateUserInternalState);
    // If there's an updated user, make the updateUser API service call.
    if (updatedUser) {
      try {
        const response = await mockUpdateUser(updatedUser as User);
        console.log("userListState calling updateUser() - response:", response);

        // Set the app userListState for the list with our updated list.
        return response;
      } catch (error) {
        console.error(`userListState -> updateUser() ERROR: \n${error}`);
        return [];
      }
    }

    const userList = get(userServiceRequestState);
    console.log("userListState calling getUsers() - response:", userList);

    return userList;
  }
});

/**
 * Make an aync request inside a selector, with a mocked service call.
 */
export const addUserState = selector<User | null>({
  key: "addUserState",

  get: async ({ get }) => get(addUserInternalState),
  set: async ({ get, set }, newUser) => {
    // Setting the newUserState with a value
    // kicks off a new userList selector execution,
    // which will make a createUser() request.
    set(addUserInternalState, newUser);
    console.log("set(addUserInternalState, newUser);");

    // We need to clear the internal state value to avoid additional
    // createUser requests.
    // TODO: this works, but it's ugly.
    setTimeout(() => {
      set(addUserInternalState, null);
      console.log("set(addUserInternalState, null);");
    }, 0);
  }
});

/**
 * Make an aync request inside a selector, with a mocked service call.
 */
export const updateUserState = selector<User | null>({
  key: "updateUserState",

  get: async ({ get }) => get(updateUserInternalState),
  set: async ({ get, set }, updatedUser) => {
    // Setting the newUserState with a value
    // kicks off a new userList selector execution,
    // which will make a createUser() request.
    set(updateUserInternalState, updatedUser);
    console.log("set(updateUserInternalState, updatedUser);");

    // We need to clear the internal state value to avoid additional
    // createUser requests.
    // TODO: this works, but it's ugly.
    setTimeout(() => {
      set(updateUserInternalState, null);
      console.log("set(updateUserInternalState, null);");
    }, 0);
  }
});
