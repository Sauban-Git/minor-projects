import { useRecoilValue, useSetRecoilState } from "recoil";
import { filterTodosAtoms, todosAtoms } from "../store/atoms/AllTodo";

export function TodoFilter() {
    const todos = useRecoilValue(todosAtoms)
  const setFilterTodos = useSetRecoilState(filterTodosAtoms);
  return (
    <div>
      <input
        style={{
            border: 2,
          bottom: 10,
          padding: 10,
          margin: 10,
          left: "50%",
          transform: "translateX(-50%)",
          position: "fixed",
        }}
        type="text"
        placeholder="Search"
        onChange={(e) => {
            const filterString = e.target.value;
          setFilterTodos(todos.filter(todo => todo.title.toLowerCase().includes(filterString.toLowerCase())));
        }}
      ></input>
    </div>
  );
}
