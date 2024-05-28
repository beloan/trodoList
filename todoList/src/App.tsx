import './App.css'
import {Header} from "./components/Header/Header.tsx";
import React, {useEffect} from "react";
import {Todo} from "./components/Todo/Todo.tsx";
import {List} from "./components/List/List.tsx";

const TodoList = localStorage.getItem('tasks') !== null
    ? JSON.parse(localStorage.getItem('tasks') || "")
    : [
        {id: 1, name: 'task1', description: 'description1', checked: false}
];

function App() {
  const [todos, setTodos] = React.useState(TodoList);

  useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(todos));
        }, [todos]);

  const addTodo = ({name, description} : Omit<Todo, 'checked' | 'id'>) => {
      setTodos([...todos, {id: todos.length == 0 ? 1 : todos[todos.length - 1].id + 1, description, name, checked: false}]);
  }

  const checkTodo = (id: Todo['id']) => {
      setTodos(todos.map((todo: { id: number; checked: boolean; }) => {
          if(todo.id === id) {
              return { ...todo, checked: !todo.checked};
          }

          return todo;
      })
      )
  }

    const deleteTodo = (id: Todo['id']) => {
        setTodos(todos.filter((todo: { id: number; }) => todo.id !== id));
    }

  return (
    <div className="container_app">
        <Header todoCount={todos.filter((todo: { checked: boolean; }) => !todo.checked).length}/>
        <Todo addTodo={addTodo}/>
        <List todos={todos} checkTodo={checkTodo} deleteTodo={deleteTodo}/>
    </div>
  )
}

export default App
