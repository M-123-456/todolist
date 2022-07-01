import { useState } from 'react';

const TodoForm = ( { idGenerator, setTodos } ) => {

    const [newTodo, setNewTodo] = useState('');

    
    const handleChangeInput = (e) => {
        setNewTodo(e.target.value);
    }

    const addTodo = (e) => {
        e.preventDefault();

        setTodos(prevTodos => ([
            ...prevTodos,
            {
                id: idGenerator(),
                todo: newTodo,
                isDone: false
            }
        ]));

        setNewTodo('');
    }    

    return (
        <form  
            onSubmit={addTodo}>
            <div className="todo">
                <input
                className="todo-input"
                type="text" 
                name="todo" 
                value={newTodo}
                placeholder='New todo...'
                onChange={handleChangeInput}
                autoFocus
                />
            </div>
        </form>
    );
}
 
export default TodoForm;