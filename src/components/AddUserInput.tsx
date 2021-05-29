import React, { useState } from "react";
import {
  useRecoilState,
  useRecoilStateLoadable,
  useRecoilValueLoadable,
  useSetRecoilState
} from "recoil";
import { UserListView } from "./UserListView";
import { addUserState, selectedUserState, userListState } from "../state";
import { User } from "../types";
import { defaultBlankUser, defaultNewUser } from "../configuration";

const newUserEmpty = { ...defaultNewUser, id: new Date().getTime() };

export function AddUserInput() {
  // Application state
  const userListLoadable = useRecoilValueLoadable(userListState);

  // We only use the setter for addUserState.
  const addUser = useSetRecoilState(addUserState);

  const userList =
    userListLoadable.state === "hasValue" ? userListLoadable.contents : null;

  // local state
  // const newUserEmpty = { ...defaultNewUser, id: new Date().getTime() };

  const [newUser, setNewUser] = useState<User>(newUserEmpty);

  /**
   * Update the newUser's `first_name`.
   * @param event
   */
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewUser({ ...newUser, first_name: `${event.target.value}` });
  };

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    // console.log("newUser", newUser);
    if (newUser?.first_name && userList) {
      // Update the app state user list.
      // setUserList([...userList, newUser]);

      // Call the app state selector which will make a service call
      // to create a new user and add it to the list.
      // createUser(newUser);
      addUser(newUser);

      // Reset the loca state newUser to be blank.
      setNewUser(newUserEmpty);
    }
  };

  return (
    <div>
      <input onChange={handleInputChange} value={newUser.first_name} />
      <button onClick={handleButtonClick}>Create User</button>
    </div>
  );
}
