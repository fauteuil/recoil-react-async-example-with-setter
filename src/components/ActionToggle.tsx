import React, { useState } from "react";

const actions = {
  add: "add",
  edit: "edit"
};

export function ActionToggle() {
  const [visibleAction, setVisibleAction] = useState(actions.add);

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
