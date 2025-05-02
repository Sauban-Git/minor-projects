import { useRecoilValue, useSetRecoilState } from "recoil";
import { filterTodosAtoms, todosAtoms } from "../store/atoms/AllTodo";

export function TodoFilter() {
  const todos = useRecoilValue(todosAtoms);
  const setFilterTodos = useSetRecoilState(filterTodosAtoms);
  return (
    <div  className="m-2 p-5 shadow-xl rounded-xl">
      <input className="p-3"
        type="text"
        placeholder="Search"
        onChange={(e) => {
          const filterString = e.target.value;
          setFilterTodos(
            todos.filter((todo) =>
              todo.title.toLowerCase().includes(filterString.toLowerCase())
            )
          );
        }}
      ></input>
    </div>
  );
}
