import { useState } from "react";

export function CreateTodo({ todos, setTodos }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  return (
    <div>
      <input
        id="title"
        style={{
          padding: 10,
          margin: 10,
        }}
        type="text"
        placeholder="Title"
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      ></input>
      <br />
      <input
        id="desc"
        style={{
          padding: 10,
          margin: 10,
        }}
        type="text"
        placeholder="Description"
        onChange={(e) => {
          setDescription(e.target.value);
        }}
      ></input>
      <br />
      <button
        onClick={() => {
          fetch("http://localhost:3000/todo", {
            method: "POST",
            body: JSON.stringify({
              title: title,
              description: description,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then(async (res) => {
              const json = await res.json();
              alert("Todo Created!");
            })
            .then(() => {
              setTodos([
                ...todos,
                {
                  title: title,
                  description: description,
                },
              ]);
            });
        }}
        style={{
          padding: 10,
          margin: 10,
        }}
      >
        Add a Todo
      </button>
    </div>
  );
}
// module.exports = CreateTodo
// export default CreateTodo;
