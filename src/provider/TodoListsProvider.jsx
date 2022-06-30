import { useState, createContext } from 'react';

export const TodoListsContext = createContext();

const TodoListsProvider = ( { children }) => {
    const [todoLists, setTodoLists] = useState([]);
    const [displayedTodoList, setDisplayedTodoList] = useState({});
    const [isChangedDisplayedTodoList, setIsChangedDisplayedTodoList] = useState(false);

    return ( 
    <TodoListsContext.Provider 
    value={{ 
        todoLists, setTodoLists, displayedTodoList, setDisplayedTodoList,isChangedDisplayedTodoList, setIsChangedDisplayedTodoList
        }}>
        {children}
    </TodoListsContext.Provider>    
    );
}

 
export default TodoListsProvider;