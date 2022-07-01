import { useState, useContext, useEffect } from 'react';

import { MdDone } from 'react-icons/md';
import { MdDeleteForever } from 'react-icons/md';

import { TodoListsContext } from '../../../provider/TodoListsProvider';

const Todo = ( { id, todo, isDone, listId, filteredTodos } ) => {

    const { todoLists, setTodoLists } = useContext(TodoListsContext);
    const [todos, setTodos] = ([]);

    console.log('filteredTodos', filteredTodos)
    
    // state isEdit is triggered by clicking on the todo div to show edit form. To be set to false onBlur. 
    const [isEdit, setIsEdit] = useState(false);
    // the input todo is stored on editInput temporary till it is added to state todos
    const [editTodo, setEditTodo] = useState(todo || '');

    console.log(todos);


     useEffect(() => {
        updateTodoLists();
    }, [todos]);

    const updateTodoLists = () => {
        setTodoLists((prevTodoLists => {
            return prevTodoLists.map(todoList => {
                if(todoList.id === listId) {
                    return {
                        ...todoList,
                        todos: todos
                    }
                } else {
                    return todoList;
                }
            })
        }));
    }


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

        setTodos((prevTodos) => {
            return prevTodos.map(todo => (
                todo.id === id ?
                {
                    ...todo,
                    todo: editTodo
                } : todo
            ))
        });

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
        const removed = todos.filtered(todo => todo.id !== id);

        setTodos(removed);
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
                                    onClick={(e) => removeTodo(e, listId, id)}
                                />                         
                            </div>
                    </li>
                )
            }
        </div>
    );
}
 
export default Todo;