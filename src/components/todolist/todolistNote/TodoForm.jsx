import { useContext, useState } from 'react';

import { TodoListsContext } from '../../../provider/TodoListsProvider';


const TodoForm = ( { idGenerator, filteredListId } ) => {

    const { setTodoLists } = useContext(TodoListsContext);

    const [todo, setTodo] = useState('');

    
    const handleChangeInput = (e) => {
        setTodo(e.target.value);
    }

    const addTodo = (e, filteredListId) => {
        e.preventDefault();

        const newTodo = {
            id: idGenerator(),
            todo: todo,
            isDone: false
        };
        
        setTodoLists(TodoLists => {
            return TodoLists.map(todoList => {
                if(todoList.id === filteredListId){
                    return {
                        ...todoList,
                        todos: [
                            ...todoList.todos, 
                            newTodo
                        ]
                    }

                } else {
                    return todoList;
                }
            })
        })

        setTodo('');
    }    

    return (
        <form  
            onSubmit={(e) => addTodo(e, filteredListId)}>
            <div className="todo">
                <input
                className="todo-input"
                type="text" 
                name="todo" 
                value={todo}
                placeholder='New todo...'
                onChange={handleChangeInput}
                autoFocus
                />
            </div>
        </form>
    );
}
 
export default TodoForm;