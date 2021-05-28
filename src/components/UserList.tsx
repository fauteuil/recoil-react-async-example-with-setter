import React from "react";
import { useRecoilState, useRecoilStateLoadable } from "recoil";
import { UserListView } from "./UserListView";
import { selectedUserState, userListState } from "../state";
import { User } from "../types";
import { defaultBlankUser } from "../configuration";

export function UserList() {
  const [usersData, setUserState] = useRecoilStateLoadable(userListState);
  const [selectedUser, setSelectedUser] = useRecoilState(selectedUserState);

  const handleUserClick = (user: User) => (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    const selectedUser = user || defaultBlankUser;
    console.log("handleUserClick", selectedUser);
    setSelectedUser(selectedUser);
  };

  if (usersData.state === "hasError") {
    return <div> There is some problem! </div>;
  }

  if (usersData.state === "loading") {
    return <div>Loading...</div>;
  }

  if (usersData.state === "hasValue") {
    return (
      <>
        <UserListView
          users={usersData.contents}
          handleUserClick={handleUserClick}
        />
      </>
    );
  }

  return <div>No results...</div>;
}
