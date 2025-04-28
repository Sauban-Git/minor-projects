import { CreateTodo } from "./comp/CreateTodo";
import "./App.css";
import { Todos } from "./comp/Todos";
import { RecoilRoot } from "recoil";
import { NumTodo } from "./comp/NumTodo";
import { TodoFilter } from "./comp/TodoFilter";

function App() {
  return (
    <div>
      <RecoilRoot>
        <NumTodo />
        <CreateTodo />
        <Todos />
        <TodoFilter/>
      </RecoilRoot>
    </div>
  );
}

export default App;
