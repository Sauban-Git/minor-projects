import { CreateTodo } from "./comp/CreateTodo";
import "./App.css";
import { Todos } from "./comp/Todos";
import { RecoilRoot } from "recoil";

function App() {
  return (
    <div>
      <RecoilRoot>
        <CreateTodo />
        <Todos />
      </RecoilRoot>
    </div>
  );
}

export default App;
