import axios from "axios";
import { User, UserApiData } from "./types";
import { userListApiUrl } from "./configuration";

/**
 * Service call for the `User` list
 */
export async function getUsers() {
  try {
    const response = await axios.get<UserApiData>(userListApiUrl);

    return response.data || [];
  } catch (error) {
    throw new Error(
      `Error in 'axiosGetJsonData(${userListApiUrl})': ${error.message}`
    );
  }
}

/**
 * Mock service call to append a new `User` to the original `getUsers()` response.
 * @description This mimics a service which responds to a POST request with an updated list.
 *              We could also explicitly return the `getUsers()` response after the update.
 * @param newUser: User
 */
export async function mockCreateUser(newUser: User) {
  try {
    // API GET
    const response = await getUsers();

    // Fake an update by appending our new User manually.
    response.data.push(newUser as User);

    return response.data;
  } catch (error) {
    throw new Error(
      `Error in mockCreateUser() - 'axiosGetJsonData(${userListApiUrl})': ${error.message}`
    );
  }
}

/**
 * Mock service call to update the specified `User` from the original `getUsers()` response.
 * @description This mimics a service which responds to a POST request with an updated list.
 *              We could also explicitly return the `getUsers()` response after the update.
 * @param updatedUser: User
 */
export async function mockUpdateUser(updatedUser: User) {
  try {
    const response = await getUsers();

    const updatedList = response.data;
    const targetIndex = updatedList.findIndex(
      (item) => item.id === updatedUser.id
    );
    updatedList.splice(targetIndex, 1, updatedUser);
    return updatedList;
  } catch (error) {
    throw new Error(
      `Error in mockUpdateUser() - 'axiosGetJsonData(${userListApiUrl})': ${error.message}`
    );
  }
}
