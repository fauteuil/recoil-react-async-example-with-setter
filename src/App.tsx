import React, { useState } from "react";
import "./styles.css";
import { RecoilRoot } from "recoil";
import { UserListAdd } from "./components/UserListAdd";
import { UserListEdit } from "./components/UserListEdit";
import { AddUserInput } from "./components/AddUserInput";
import { UpdateUserInput } from "./components/UpdateUserInput";

const actions = {
  add: "add",
  edit: "edit"
};

export default function App() {
  const [visibleAction, setVisibleAction] = useState(actions.add);

  function ActionToggle() {
    return (
      <>
        <select
          value={visibleAction}
          onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
            setVisibleAction(event.target.value);
          }}
        >
          <option label="Add" value={actions.add} />
          <option label="Edit" value={actions.edit} />
        </select>
        <br />
      </>
    );
  }

  return (
    <RecoilRoot>
      <div className="App">
        <h1>Dynamic React Application State</h1>
        <h2>with Recoil / TypeScript</h2>
        <hr />
        <h3>User List</h3>

        <ActionToggle />
        <br />
        {visibleAction === actions.add && (
          <>
            <UserListAdd />
            <br />
            <AddUserInput />
          </>
        )}
        {visibleAction === actions.edit && (
          <>
            <UserListEdit />
            <br /> <UpdateUserInput />
          </>
        )}
      </div>
    </RecoilRoot>
  );
}
