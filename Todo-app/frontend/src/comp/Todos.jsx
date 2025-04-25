export function Todos({ todos, setTodos }) {
  const markAsDone = (id) => {
    fetch("http://localhost:3000/completed", {
      method: "PUT",
      body: JSON.stringify({ id }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(() => {
        setTodos((prevTodos) =>
          prevTodos.map((todo) =>
            todo._id === id ? { ...todo, completed: true } : todo
          )
        );
      })
      .catch((err) => console.error("Error updating todo:", err));
  };

  const todoDelete = (id) => {
    fetch("http://localhost:3000/delete", {
      method: "DELETE",
      body: JSON.stringify({ id }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(() => {
        setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
      })
      .catch((err) => console.error("Error updating todo:", err));
  };

  return (
    <div>
      {todos.map((todo) => (
        <div
          style={{
            padding: 10,
            margin: 10,
            color: "wheat",
          }}
        >
          <h1>{todo.title}</h1>
          <h2>{todo.description}</h2>
          <button
            style={{
              margin: 10,
            }}
            onClick={() => markAsDone(todo._id)}
          >
            {todo.completed ? "Completed" : "Mark as Done"}
          </button>
          <button
            onClick={() => todoDelete(todo._id)}
            style={{
              margin: 10,
            }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
