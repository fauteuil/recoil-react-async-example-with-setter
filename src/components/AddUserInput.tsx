import React, { useState } from "react";
import { useRecoilCallback, useRecoilValueLoadable } from "recoil";
import { userListStateAdd } from "../state";
import { User } from "../types";
import { defaultNewUser } from "../configuration";
import { mockCreateUser } from "../service";

const newUserEmpty = { ...defaultNewUser, id: new Date().getTime() };

export function AddUserInput() {
  // Application state
  const userListLoadable = useRecoilValueLoadable(userListStateAdd);

  // We're skipping Recoil loading or error state to see the content.
  const userListAdd =
    userListLoadable.state === "hasValue" ? userListLoadable.contents : null;

  // local state
  const [newUser, setNewUser] = useState<User>(newUserEmpty);

  // Recoil callback hook API calls
  const addUser = useRecoilCallback(
    ({ set }) => async ({ user }) => {
      try {
        const response = await mockCreateUser(user);
        // console.log("addUser calling mockCreateUser() - response:", response);

        // Set the client-facing atom with our updated list.
        // NOTE: This assumes the service call returns the updated list.
        //       We could also re-query the full list here for an up to date result.
        set(userListStateAdd, response);
      } catch (error) {
        console.error(`userListStateAdd -> addUser() ERROR: \n${error}`);
        return [];
      }
    },
    []
  );

  /**
   * Update the local newUser's `first_name`.
   * @param event: React.ChangeEvent<HTMLInputElement>
   */
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewUser({ ...newUser, first_name: `${event.target.value}` });
  };

  const handleAddUserSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (newUser?.first_name && userListAdd) {
      // Call the app state selector which will make a service call
      // to create a new user and add it to the list.
      // createUser(newUser);
      addUser({ user: newUser });

      // Reset the local state newUser value.
      setNewUser(newUserEmpty);
    }
  };

  return (
    <div>
      <input onChange={handleInputChange} value={newUser.first_name} />
      <button onClick={handleAddUserSubmit}>Create User</button>
    </div>
  );
}
