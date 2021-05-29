import React, { useState } from "react";
import {
  useRecoilState,
  useRecoilStateLoadable,
  useRecoilValue,
  useRecoilValueLoadable,
  useSetRecoilState
} from "recoil";
import { selectedUserState, updateUserState, userListState } from "../state";
import { User } from "../types";
import { defaultBlankUser } from "../configuration";

export function UpdateUserInput() {
  // Application state
  const userListLoadable = useRecoilValueLoadable(userListState);
  const userList =
    userListLoadable.state === "hasValue" ? userListLoadable.contents : null;
  const [selectedUser, setSelectedUser] = useRecoilState(selectedUserState);

  // We only use the setter for updateUserState.
  const updateUser = useSetRecoilState(updateUserState);

  // local state
  const [updatedUser, setUpdatedUser] = useState<User>(selectedUser);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setUpdatedUser({ ...selectedUser, first_name: `${event.target.value}` });
  };

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    // console.log("updatedUser", updatedUser);
    if (updatedUser?.first_name && userList) {
      // Call the app state selector which will make a service call
      // to update the user and splice it into the list.
      // createUser(newUser);
      updateUser(updatedUser);

      // Reset the local state newUser to be blank.
      setUpdatedUser(defaultBlankUser);
    }
  };

  // We want the input to show the selected user by default,
  // unless there is an updatedUser in local state.
  const currentInputValue = updatedUser.first_name || selectedUser.first_name;

  return (
    <div>
      <input onChange={handleInputChange} value={currentInputValue} />
      <button onClick={handleButtonClick}>Update User</button>
    </div>
  );
}
