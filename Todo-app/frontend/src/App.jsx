import { useState, useEffect } from "react";
import { CreateTodo } from "./comp/CreateTodo";
import "./App.css";
import { Todos } from "./comp/Todos";

function App() {
  const [todos, setTodos] = useState([]);
  

  useEffect(() => {
    fetch("http://localhost:3000/todos")
      .then(async (res) => {
        const json = await res.json();
        setTodos(json.todos);
      })
      .catch((err) => {
        console.error("Failed to fetch todos:", err);
      });
  }, []);

  return (
    <div>
      <CreateTodo setTodos={setTodos} todos={todos}/>
      <Todos setTodos={setTodos} todos={todos} />
    </div>
  );
}

export default App;
