import React, { FC } from "react";
import { User } from "../types";

interface UserListProps {
  edit?: boolean;
  handleUserClick: (
    user: User
  ) => (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  users: User[];
}

export const UserListView: FC<UserListProps> = (props) => {
  const { edit, users, handleUserClick } = props;
  const cursorStyle = edit ? "pointer" : "default";
  const itemTitle = edit ? "click to select this item" : "";
  return (
    <div>
      {users.map((user, index) => (
        <div
          key={user.id}
          onClick={handleUserClick(user)}
          style={{ cursor: `${cursorStyle}` }}
          title={itemTitle}
        >
          {`${user.last_name}, ${user.first_name}` || "no name..."}
        </div>
      ))}
    </div>
  );
};
