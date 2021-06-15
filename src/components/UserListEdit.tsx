import React from "react";
import { useRecoilValueLoadable, useSetRecoilState } from "recoil";
import { UserListView } from "./UserListView";
import { selectedUserState, userListStateEdit } from "../state";
import { User } from "../types";
import { defaultBlankUser } from "../configuration";

export function UserListEdit() {
  const userList = useRecoilValueLoadable(userListStateEdit);
  const setSelectedUser = useSetRecoilState(selectedUserState);

  const handleUserClick = (user: User) => (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    const selectedUser = user || defaultBlankUser;
    setSelectedUser(selectedUser);
  };

  if (userList.state === "hasError") {
    return <div> There is some problem! </div>;
  }

  if (userList.state === "loading") {
    return <div>Loading...</div>;
  }

  if (userList.state === "hasValue") {
    return (
      <>
        <UserListView
          edit
          users={userList.contents}
          handleUserClick={handleUserClick}
        />
      </>
    );
  }

  return <div>No results...</div>;
}
