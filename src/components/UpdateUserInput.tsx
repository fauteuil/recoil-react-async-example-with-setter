import React, { useState } from "react";
import { useRecoilState, useRecoilStateLoadable, useRecoilValue } from "recoil";
import { UserListView } from "./UserListView";
import { selectedUserState, userListState } from "../state";
import { User } from "../types";
import { defaultBlankUser } from "../configuration";

export function UpdateUserInput() {
  // Application state
  const [userListData, setUserListState] = useRecoilStateLoadable(
    userListState
  );
  const userList =
    userListData.state === "hasValue" ? userListData.contents : null;
  const [selectedUser, setSelectedUser] = useRecoilState(selectedUserState);

  // local state
  const [updatedUser, setUpdatedUser] = useState<User>(selectedUser);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setUpdatedUser({ ...selectedUser, first_name: `${event.target.value}` });
  };

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (selectedUser?.first_name && userList) {
      //Find and update the updated user in the app state.
      const targetUserIndex = userList.findIndex(
        (item) => item.id === selectedUser.id
      );

      // Update only if an index was found.
      if (targetUserIndex >= 0) {
        // Update the app state list
        // by splicing in the updated item
        // to a copy of the original, immutable array.
        const arrayToUpdate = [...userList];
        arrayToUpdate.splice(targetUserIndex, 1, updatedUser);
        setUserListState(arrayToUpdate);

        // Reset the local state newUser to be blank.
        setSelectedUser(defaultBlankUser);
        // Reset the app state selected user to be blank.
        setUpdatedUser(defaultBlankUser);
      }
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
