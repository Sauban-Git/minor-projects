import { useRecoilValue } from "recoil"
import { todosAtoms } from "../store/atoms/AllTodo"

export function NumTodo() {
    const todos = useRecoilValue(todosAtoms)
    const numComplete = todos.filter(todo => todo.completed === true).length
    return (
        <div className="info">
            <button>Total Todos: {todos.length}</button>
            <button disabled={false} >Completed: {numComplete}</button>
        </div>
    )
}