import { useState, createContext } from 'react';

export const TodoListsContext = createContext();

const TodoListsProvider = ( { children }) => {
    const [todoLists, setTodoLists] = useState([]);
    const [displayedTodoList, setDisplayedTodoList] = useState({});


    return ( 
    <TodoListsContext.Provider 
    value={{ 
        todoLists, setTodoLists, displayedTodoList, setDisplayedTodoList
        }}>
        {children}
    </TodoListsContext.Provider>    
    );
}

 
export default TodoListsProvider;