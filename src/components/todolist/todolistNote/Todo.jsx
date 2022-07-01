import { useState } from 'react';

import { MdDone } from 'react-icons/md';
import { MdDeleteForever } from 'react-icons/md';


const Todo = ( { id, todo, isDone, listId, todos, setTodos } ) => {

    // state isEdit is triggered by clicking on the todo div to show edit form. To be set to false onBlur. 
    const [isEdit, setIsEdit] = useState(false);
    // the input todo is stored on editInput temporary till it is added to state todos
    const [editTodo, setEditTodo] = useState(todo || '');

    // trigger isEdit of clicked div
    const handleEdit = (id) => {
        setIsEdit(prev => !prev);
        const matched = todos.find(todo => todo.id === id);
        setEditTodo(matched.todo);
    }

    const handleChange = (e) => {
        setEditTodo(e.target.value);
    }

     const updateTodo = (e, id) => {
        e.preventDefault();

        setTodos(prevTodos => prevTodos.map(todo => (
            todo.id === id ?
            {
                ...todo,
                todo: editTodo
            }: todo
        )));

        setEditTodo('');
        setIsEdit(false);
    }



    const completeTodo = (e, id) => {
        e.stopPropagation();
        console.log('clicked');
        console.log(todos);

        setTodos(prevTodos => prevTodos.map(todo => (
            todo.id === id ?
                { ...todo, isDone: !todo.isDone }
                : todo
        )));
    };


    const removeTodo = (e, id) => {
        e.stopPropagation();
        console.log('id', id);
        setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
        console.log(todos);
    };
  
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
                                value={editTodo}
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
                                <MdDone
                                    className="icon"
                                    onClick={(e) => completeTodo(e, id)}
                                />
                                <MdDeleteForever
                                    className="icon"
                                    onClick={(e) => removeTodo(e, id)}
                                />                         
                            </div>
                    </li>
                )
            }
        </div>
    );
}
 
export default Todo;