import React, {ChangeEvent, FC} from "react";
import {ButtonAdd} from "../ButtonAdd/ButtonAdd.tsx";
import './Todo.css';

const defaultTodo = {
    name: '',
    description: ''
};
export type Todo = {
    id: number;
    name: string;
    description: string;
    checked: boolean;
}

interface TodoProps {
    addTodo: ({name, description} : Omit<Todo, 'checked' | 'id'>) => void;
}

export const Todo: FC<TodoProps> = ({ addTodo }) => {

    const [todo, setTodo] = React.useState(defaultTodo);

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target
        setTodo({...todo, [name]: value})
    }

    const onClick = () => {
        addTodo({ name: todo.name, description: todo.description})
        setTodo(defaultTodo)
    }

    return (
        <div className="container">
            <form>
                <label>
                    Название задачи
                    <input type='text' id='name' value={todo.name} name='name' placeholder="Название задачи" className={"first"} onChange={onChange}/>
                </label>

                <label>
                    Описание задачи
                    <input type='text' id='description' value={todo.description} name='description' placeholder="Описание задачи" className={"second"} onChange={onChange}/>
                </label>

                <ButtonAdd color={'blue'} onClick={onClick}>
                    Добавить
                </ButtonAdd>
            </form>
        </div>
    );
}