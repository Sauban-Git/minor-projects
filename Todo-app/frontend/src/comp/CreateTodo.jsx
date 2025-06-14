import { memo, useRef, useState } from "react";
import { useSetRecoilState } from "recoil";
import { todosAtoms } from "../store/atoms/AllTodo";

export const CreateTodo = memo(function () {
  const setTodos = useSetRecoilState(todosAtoms);
  const titleRef = useRef();
  const descRef = useRef();
  const [loading, setLoading] = useState(false);

  const handleCreate = () => {
    const title = titleRef.current.value;
    const description = descRef.current.value;
    if (title === "" || description === "") {
      alert("Dont leave the field empty");
      return;
    }

    setLoading(true);

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
      .then((res) => res.json())
      .then((data) => {
        return fetch("http://localhost:3000/todos");
      })
      .then((res) => res.json())
      .then((json) => {
        setTodos(json.todos);
        titleRef.current.value = "";
        descRef.current.value = "";
      })
      .catch((err) => {
        console.error("Something went wrong:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="rounded-xl shadow-xl m-2"
    >
      <input
        id="title"
        style={{
          padding: 10,
          margin: 10,
        }}
        type="text"
        placeholder="Title"
        ref={titleRef}
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
        ref={descRef}
      ></input>
      <br />
      <button
        onClick={handleCreate}
        style={{
          padding: 10,
          margin: 10,
        }}
        disabled={loading}
      >
        {loading ? "Adding..." : "Add a Todo"}
      </button>
    </div>
  );
});
