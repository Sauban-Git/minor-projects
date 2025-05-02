import { useRecoilState } from "recoil";
import { filterTodosAtoms, todosAtoms } from "../store/atoms/AllTodo";
import { useEffect, useCallback } from "react";

const fetchTodos = async (setTodos) => {
  try {
    const res = await fetch("http://localhost:3000/todos");
    const json = await res.json();
    setTodos(json.todos);
  } catch (err) {
    console.error("Failed to fetch todos:", err);
  }
};

const handleTodoAction = async (url, method, body, successCallback, id) => {
  try {
    const res = await fetch(url, {
      method: method,
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    successCallback(id, data);
  } catch (err) {
    console.error(`Error ${method} todo:`, err);
  }
};

export function Todos() {
  const [filterTodos, setFilterTodos] = useRecoilState(filterTodosAtoms);
  const [todos, setTodos] = useRecoilState(todosAtoms);

  useEffect(() => {
    fetchTodos(setTodos);
  }, []);

  const markAsDone = useCallback(
    (id) => {
      const todo = todos.find((t) => t._id === id);
      if (todo?.completed) return;

      handleTodoAction(
        "http://localhost:3000/completed",
        "PUT",
        { id },
        (id) => {
          setTodos((prevTodos) =>
            prevTodos.map((todo) =>
              todo._id === id ? { ...todo, completed: true } : todo
            )
          );
        },
        id
      );
    },
    [todos, setTodos]
  );

  const todoDelete = useCallback(
    (id) => {
      handleTodoAction(
        "http://localhost:3000/delete",
        "DELETE",
        { id },
        (id) => {
          setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
        },
        id
      );
    },
    [setTodos]
  );

  const filterMarkAsDone = useCallback(
    (id) => {
      const todo = todos.find((t) => t._id === id);
      if (todo?.completed) return;

      handleTodoAction(
        "http://localhost:3000/completed",
        "PUT",
        { id },
        (id) => {
          setFilterTodos((prevTodos) =>
            prevTodos.map((todo) =>
              todo._id === id ? { ...todo, completed: true } : todo
            )
          );
          setTodos((prevTodos) =>
            prevTodos.map((todo) =>
              todo._id === id ? { ...todo, completed: true } : todo
            )
          );
        },
        id
      );
    },
    [todos, setTodos, setFilterTodos]
  );

  const filterTodoDelete = useCallback(
    (id) => {
      handleTodoAction(
        "http://localhost:3000/delete",
        "DELETE",
        { id },
        (id) => {
          setFilterTodos((prevTodos) =>
            prevTodos.filter((todo) => todo._id !== id)
          );
          setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
        },
        id
      );
    },
    [setTodos, setFilterTodos]
  );

  const renderTodo = (todo, markDone, deleteTodo) => (
    <>
      <div className="rounded-xl shadow-xl m-2 p-10">
        <ul key={todo._id}>
          <li className="flex justify-center font-bold">{todo.title}</li>
          <li className="flex justify-center">{todo.description}</li>
        </ul>
        <div className="shadow-md flex justify-between rounded-xl bg-gray-300">
          <button className="m-2"
            onClick={() => markDone(todo._id)}
          >
            {todo.completed ? "Completed" : "Mark as Done"}
          </button>
          <button className="m-2"
            onClick={() => deleteTodo(todo._id)}
          >
            Delete
          </button>
        </div>
      </div>
    </>
  );

  const todosToRender = filterTodos.length === 0 ? todos : filterTodos;

  return (
    <div className="grid md:grid-cols-3 sm:grid-cols-2">
      {todosToRender.map((todo) =>
        renderTodo(
          todo,
          filterTodos.length === 0 ? markAsDone : filterMarkAsDone,
          filterTodos.length === 0 ? todoDelete : filterTodoDelete
        )
      )}
    </div>
  );
}
