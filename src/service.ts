import axios from "axios";
import { User, UserApiData } from "./types";
import {
  createUserApiUrl,
  getUserApiUrl,
  userListApiUrl
} from "./configuration";
import { DefaultValue } from "recoil";

export async function getUsers() {
  try {
    const response = await axios.get<UserApiData>(userListApiUrl);
    // console.log("getUsers response: ", response?.data?.data);
    return response.data || [];
  } catch (error) {
    throw new Error(
      `Error in 'axiosGetJsonData(${userListApiUrl})': ${error.message}`
    );
  }
}

// Append our new item to the origina API get response,
// to mimic a service which responds to a create request,
// with an updated list.
export async function mockCreateUser(newUser: User) {
  try {
    const response = await getUsers();
    // console.log("service.createUser response: ", response?.data);

    response.data.push(newUser as User);
    return response.data;
  } catch (error) {
    throw new Error(
      `Error in 'axiosGetJsonData(${userListApiUrl})': ${error.message}`
    );
  }
}

// Update our updated item within the origina API get response,
// to mimic a service which responds to an update request,
// with an updated list.
export async function mockUpdateUser(updatedUser: User) {
  try {
    const response = await getUsers();
    // console.log("service.updateUser response: ", response?.data);

    const updatedList = response.data;
    const targetIndex = updatedList.findIndex(
      (item) => item.id === updatedUser.id
    );
    updatedList.splice(targetIndex, 1, updatedUser);
    return updatedList;
  } catch (error) {
    throw new Error(
      `Error in 'axiosGetJsonData(${userListApiUrl})': ${error.message}`
    );
  }
}
