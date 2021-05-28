import React, { useState } from "react";
import { useRecoilState, useRecoilStateLoadable } from "recoil";
import { UserListView } from "./UserListView";
import { selectedUserState, userListState } from "../state";
import { User } from "../types";
import { defaultUser } from "../configuration";

export function AddUserInput() {
  // Application state
  const [usersData, setUserState] = useRecoilStateLoadable(userListState);
  const userList = usersData.state === "hasValue" ? usersData.contents : null;

  // local state
  const [newUser, setNewUser] = useState<User>(defaultUser);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewUser({
      first_name: `${event.target.value}`,
      last_name: "Surname",
      email: "a.new@email.addr"
    });
  };

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (newUser?.first_name && userList) {
      setUserState([...userList, newUser]);
      setNewUser(defaultUser);
    }
  };

  return (
    <div>
      <input onChange={handleInputChange} value={newUser.first_name} />
      <button onClick={handleButtonClick}>Add User</button>
    </div>
  );
}
