import { useRecoilValue } from "recoil";
import { todosAtoms } from "../store/atoms/AllTodo";

export function NumTodo() {
  const todos = useRecoilValue(todosAtoms);
  const numComplete = todos.filter((todo) => todo.completed === true).length;
  return (
    <div
      className=" shadow-xl m-2 rounded-xl"
      // style={{
      //   width: "300px",
      //   borderRadius: "10px",
      //   boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      //   overflow: "hidden",
      //   transition: "transform 0.2s ease",
      // }}
    >
      <button disabled={false} style={{
        margin: 10,
        padding: 10,
      }}>Total Todos: {todos.length}</button>
      <button style={{
        margin: 10,
        padding: 10,
      }} disabled={false}>Completed: {numComplete}</button>
    </div>
  );
}
