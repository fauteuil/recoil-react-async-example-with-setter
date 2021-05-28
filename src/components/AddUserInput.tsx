import React, { useState } from "react";
import { useRecoilState, useRecoilStateLoadable } from "recoil";
import { UserListView } from "./UserListView";
import { selectedUserState, userListState } from "../state";
import { User } from "../types";
import { defaultBlankUser, defaultNewUser } from "../configuration";

export function AddUserInput() {
  // Application state
  const [userListData, setUseListState] = useRecoilStateLoadable(userListState);
  const userList =
    userListData.state === "hasValue" ? userListData.contents : null;

  // local state
  const newUserEmpty = { ...defaultNewUser, id: new Date().getTime() };

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
    console.log("newUser", newUser);
    if (newUser?.first_name && userList) {
      // Update the app state user list.
      setUseListState([...userList, newUser]);

      // Reset the loca state newUser to be blank.
      setNewUser(defaultBlankUser);
    }
  };

  return (
    <div>
      <input onChange={handleInputChange} value={newUser.first_name} />
      <button onClick={handleButtonClick}>Add User</button>
    </div>
  );
}
