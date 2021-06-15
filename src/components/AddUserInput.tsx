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

  // Recoil callback hook for API calls
  // - This gives us a memoized function that exposes Recoil `set` and won't be recreated
  // - unless anything in the dependencies array (at the bottom) changes.
  const addUser = useRecoilCallback(
    ({ set }) => async ({ user }) => {
      try {
        const response = await mockCreateUser(user);

        // Set the client-facing atom with our updated list.
        // NOTE: This assumes the service call returns the updated list.
        //       We could also re-query the full list here for an up to date result.
        set(userListStateAdd, response);
      } catch (error) {
        console.error(`userListStateAdd -> addUser() ERROR: \n${error}`);
        return [];
      }
    },
    [mockCreateUser, userListStateAdd]
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
      // Call our Recoil callback hook to make a service call
      // and update the App state with the result.
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
