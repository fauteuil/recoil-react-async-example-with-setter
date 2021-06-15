import React, { useState } from "react";
import {
  useRecoilCallback,
  useRecoilState,
  useRecoilValueLoadable
} from "recoil";
import { selectedUserState, userListStateEdit } from "../state";
import { User } from "../types";
import { defaultBlankUser } from "../configuration";
import { mockUpdateUser } from "../service";

export function UpdateUserInput() {
  // Application state
  const userListLoadable = useRecoilValueLoadable(userListStateEdit);

  // We're skipping Recoil loading or error state to see the content.
  const userList =
    userListLoadable.state === "hasValue" ? userListLoadable.contents : null;
  const [selectedUser, setSelectedUser] = useRecoilState(selectedUserState);

  // Local state
  const [updatedUser, setUpdatedUser] = useState<User>(selectedUser);

  // Recoil callback hook API calls
  const updateUser = useRecoilCallback(
    ({ set }) => async ({ user }) => {
      try {
        const response = await mockUpdateUser(user);
        // console.log("updateUser calling mockUpdateUser() - response:", response);

        // Set the client-facing atom with our updated list.
        // NOTE: This assumes the service call returns the updated list.
        set(userListStateEdit, response);
      } catch (error) {
        console.error(`userListStateEdit -> updateUser() ERROR: \n${error}`);
        return [];
      }
    },
    []
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setUpdatedUser({ ...selectedUser, first_name: `${event.target.value}` });
  };

  const handleUpdateUserSubmit = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();

    if (updatedUser?.first_name && userList) {
      // Call the app state selector which will make a service call
      // to update the user and splice it into the list.
      // createUser(newUser);
      updateUser({ user: updatedUser });
    }

    // Reset the local and Recoil states to be blank.
    setSelectedUser(defaultBlankUser);
    setUpdatedUser(defaultBlankUser);
  };

  // We want the input to show the selected user by default,
  // unless there is an updatedUser in local state.
  const currentInputValue = updatedUser.first_name || selectedUser.first_name;

  return (
    <div>
      <input onChange={handleInputChange} value={currentInputValue} />
      <button onClick={handleUpdateUserSubmit}>Update User</button>
    </div>
  );
}
