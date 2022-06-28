import { useState, useRef, useEffect } from 'react';

import { MdDone } from 'react-icons/md';
import { MdDeleteForever } from 'react-icons/md';
import TodoForm from './TodoForm';
import TodoList from './TodoList';

const Todo = ( {id, todo, isDone, completeTodo, removeTodo, todos, setTodos } ) => {
    const [isEdit, setIsEdit] = useState(false);
    const [editInput, setEditInput] = useState('');
    // const editRef = useRef(null);

    // useEffect(() => {
    //     editRef.current.focus();
    // });

    const handleEdit = (id) => {
        setIsEdit(prev => !prev);

        const matched = todos.find(todo => todo.id === id);

        setEditInput(matched.todo);
    }

    const updateTodo = (e, id) => {
        e.preventDefault();

        setTodos((prevTodos => prevTodos.map((prevTodo) => (
            prevTodo.id === id ?
            {
                ...prevTodo,
                todo: editInput
            }: prevTodo
        ))));

        setEditInput('');
        setIsEdit(false);
    }
  
    return (
        <div>
            {/* input field */}
            <div>
                {
                    isEdit ?
                    (
                        <TodoForm
                            id={id}
                            isEdit={isEdit}
                            setIsEdit={setIsEdit}
                            editInput={editInput}
                            setEditInput={setEditInput}
                            updateTodo={updateTodo}
                        />
                    ):
                    (
                        <div 
                            className="todo-card"
                            onClick={() => handleEdit(id)}
                        >
                            <div
                                className={isDone ? "todo complete" : "todo"}
                            >
                                <div>{todo}</div>
                            </div>
                            <div className="todo-icons">
                                <MdDone 
                                    onClick={(e) => completeTodo(e, id)}
                                    />
                                <MdDeleteForever
                                    onClick={() => removeTodo(id)}
                                    />
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
}
 
export default Todo;