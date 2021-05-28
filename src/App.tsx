import "./styles.css";
import { RecoilRoot } from "recoil";
import { UserList } from "./components/UserList";
import { AddUserInput } from "./components/AddUserInput";
import { UpdateUserInput } from "./components/UpdateUserInput";

export default function App() {
  return (
    <RecoilRoot>
      <div className="App">
        <h1>Dynamic React Application State</h1>
        <h2>with Recoil / TypeScript</h2>
        <hr />
        <h3>User List</h3>
        <UserList />
        <AddUserInput />
        <UpdateUserInput />
      </div>
    </RecoilRoot>
  );
}
