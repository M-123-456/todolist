import { useState } from 'react';

import { MdDone } from 'react-icons/md';
import { MdDeleteForever } from 'react-icons/md';

const Todo = ( {id, todo, isDone, completeTodo, removeTodo, todos, setTodos } ) => {

    // state isEdit is triggered by clicking on the todo div to show edit form. To be set to false onBlur. 
    const [isEdit, setIsEdit] = useState(false);
    // the input todo is stored on editInput temporary till it is added to state todos
    const [editInput, setEditInput] = useState('');

    // trigger isEdit of clicked div
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

    const handleChange = (e) => {
        setEditInput(e.target.value);
    }
  
    return (
        <div>
            {/* if isEdit, show edit form, unless show todos */}
            {
                isEdit ?
                (
                    <li>
                        <form 
                            onSubmit={(e) => updateTodo(e, id)}>
                            <div className="todo">
                                <input
                                className="todo-input"
                                type="text" 
                                name="todo" 
                                value={editInput}
                                onChange={handleChange}
                                onBlur={() => setIsEdit(false)}     
                                autoFocus
                                />
                            </div>
                        </form>
                    </li>
                ):
                (
                    <li 
                        className="todo-line"
                        onClick={() => handleEdit(id)}
                    >
                        <p
                            className={isDone ? "complete" : ""}
                        >
                            {todo}
                        </p>
                        <div className="todo-icons">
                            <div className="todo-icons">
                                <MdDone 
                                    onClick={(e) => completeTodo(e, id)}
                                    />
                                <MdDeleteForever
                                    onClick={() => removeTodo(id)}
                                    />
                            </div>
                        </div>
                    </li>
                )
            }
        </div>
    );
}
 
export default Todo;