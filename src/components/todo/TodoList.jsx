import { useContext } from "react";
import { TodoStateContext } from "../../contexts/todoContext";
import TodoItem from "./TodoItem";

const TodoList = () => {
  const todos = useContext(TodoStateContext);
  return (
    <div>
      <h1>Todo List</h1>
      {todos.map(item => (
        <TodoItem key={item.id} todo={item} />
      ))}
    </div>
  );
};
export default TodoList;
