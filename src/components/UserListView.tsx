import React, { FC } from "react";
import { User } from "../types";

interface UserListProps {
  users: User[];
  handleUserClick: (
    user: User
  ) => (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}

export const UserListView: FC<UserListProps> = (props) => {
  const { users, handleUserClick } = props;
  return (
    <div>
      {users.map((user, index) => (
        <div key={user.id} onClick={handleUserClick(user)}>
          {`${user.last_name}, ${user.first_name}` || "no name..."}
        </div>
      ))}
    </div>
  );
};
