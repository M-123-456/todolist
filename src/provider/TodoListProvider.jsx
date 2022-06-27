import { useState, createContext } from 'react';

export const TodoListContext = createContext([]);

const TodoListProvider = ( { children }) => {
    const [todoLists, setTodoLists] = useState([]);
    return ( 
    <TodoListContext.Provider value={{ todoLists, setTodoLists }}>
        {children}
    </TodoListContext.Provider>    
    );
}
 
export default TodoListProvider;