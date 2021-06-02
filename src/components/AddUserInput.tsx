import React, { useState } from "react";
import { useRecoilCallback, useRecoilValueLoadable } from "recoil";
// import { UserListView } from "./UserListView";
import { userListStateAdd } from "../state";
import { User } from "../types";
import { defaultBlankUser, defaultNewUser } from "../configuration";
import { mockCreateUser } from "../service";

const newUserEmpty = { ...defaultNewUser, id: new Date().getTime() };

export function AddUserInput() {
  // Application state
  const userListLoadable = useRecoilValueLoadable(userListStateAdd);

  // We only use the setter for addUserState.
  // const addUser = useSetRecoilState(addUserState);

  const userListAdd =
    userListLoadable.state === "hasValue" ? userListLoadable.contents : null;

  // local state
  const [newUser, setNewUser] = useState<User>(newUserEmpty);

  // recoil callback API calls
  const addUser = useRecoilCallback(
    ({ set }) => async ({ user }) => {
      try {
        const response = await mockCreateUser(user);
        // console.log("addUser2 calling mockCreateUser() - response:", response);

        // Set the client-facing atom with our updated list.
        // NOTE: This assumes the service call returns the updated list.
        set(userListStateAdd, response);
      } catch (error) {
        console.error(`userListStateAdd -> addUser() ERROR: \n${error}`);
        return [];
      }
    },
    []
  );

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
    if (newUser?.first_name && userListAdd) {
      // Call the app state selector which will make a service call
      // to create a new user and add it to the list.
      // createUser(newUser);
      addUser({ user: newUser });

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
