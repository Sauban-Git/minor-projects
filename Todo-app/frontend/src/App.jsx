import { CreateTodo } from "./comp/CreateTodo";
import "./App.css";
import { Todos } from "./comp/Todos";
import { RecoilRoot } from "recoil";
import { NumTodo } from "./comp/NumTodo";
import { TodoFilter } from "./comp/TodoFilter";

function App() {
  return (
    <div className="grid md:grid-cols-4 gap-2">
      <RecoilRoot>
        <div className="col-span-1 flex justify-center">
          <div className="md:fixed">
            <NumTodo />
            <CreateTodo />
          </div>
          <div className="fixed bottom-1">
            <TodoFilter />
          </div>
        </div>
        <div className="md:col-span-3">
          <Todos />
        </div>
      </RecoilRoot>
    </div>
  );
}

export default App;
