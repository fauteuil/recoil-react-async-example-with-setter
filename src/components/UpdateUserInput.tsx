import React, { useState } from "react";
import { useRecoilState, useRecoilStateLoadable } from "recoil";
import { UserListView } from "./UserListView";
import { selectedUserState, userListState } from "../state";
import { User } from "../types";
import { defaultUser } from "../configuration";

export function UpdateUserInput() {
  // Application state
  const [usersData, setUserState] = useRecoilStateLoadable(userListState);
  const userList = usersData.state === "hasValue" ? usersData.contents : null;
  const [selectedUser, setSelectedUser] = useRecoilState(selectedUserState);

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

TODO: ADD UPDATE LOGIC HERE

    // if (newUser?.first_name && userList) {
    //   setUserState([...userList, newUser]);
    //   setNewUser(defaultUser);
    // }
  };

  return (
    <div>
      <input onChange={handleInputChange} value={selectedUser.first_name} />
      <button onClick={handleButtonClick}>Update User</button>
    </div>
  );
}
