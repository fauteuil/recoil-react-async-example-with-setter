import React from "react";
import {
  useRecoilState,
  useRecoilStateLoadable,
  useRecoilValueLoadable,
  useSetRecoilState
} from "recoil";
import { UserListView } from "./UserListView";
import { selectedUserState, userListState, userListStateAdd } from "../state";
import { User } from "../types";
import { defaultBlankUser } from "../configuration";

export function UserListAdd() {
  const userList = useRecoilValueLoadable(userListStateAdd);
  const setSelectedUser = useSetRecoilState(selectedUserState);

  const handleUserClick = (user: User) => (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    const selectedUser = user || defaultBlankUser;
    // console.log("handleUserClick", selectedUser);
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
          users={userList.contents}
          handleUserClick={handleUserClick}
        />
      </>
    );
  }

  return <div>No results...</div>;
}
