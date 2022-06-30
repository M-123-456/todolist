import { useState, createContext } from 'react';

export const TodoListsContext = createContext();

const TodoListsProvider = ( { children }) => {
    const [todoLists, setTodoLists] = useState([]);
    return ( 
    <TodoListsContext.Provider value={{ todoLists, setTodoLists }}>
        {children}
    </TodoListsContext.Provider>    
    );
}


 
export default TodoListsProvider;