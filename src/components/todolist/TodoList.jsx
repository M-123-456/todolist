import { useEffect, useState, useContext } from 'react';

import { TodoListsContext } from '../../provider/TodoListsProvider';


import TodoListSetting from './TodoListSetting';
import TodoListName from './TodoListName';
import TodoListNote from './todolistNote/TodoListNote';

const TodoList = ( {  idGenerator } ) => {

    const { todoLists, displayedTodoList, setDisplayedTodoList } = useContext(TodoListsContext);
    const [filteredTodoList, setFilteredTodoList] = useState({});

    console.log('filtered', filteredTodoList)


    // state used in TodoListName when changing list name or icon
    const [isEditName, setIsEditName] = useState(false);

    const [showCompletedTodos, setShowCompletedTodos] = useState(true);

    useEffect(() => {
        handleFilter();
    }, [showCompletedTodos, todoLists, displayedTodoList])

    useEffect(() => {
        updateDisplayedTodoList(displayedTodoList.id);
    }, [todoLists]);

    const isEmpty = (obj) => {
        return JSON.stringify(obj) === JSON.stringify({});
    }

    // !
    // const getTodos = () => {
    //     if(todoLists){
    //         const found = todoLists.find(todoList => todoList.id === listId);
    //         if(found){
    //             setTodos(found.todos);
    //         } else {
    //             setTodos([]);
    //         }
    //     } else {
    //         setTodos([]);
    //     }
    // };

    const updateDisplayedTodoList = (id) => {
        if(!isEmpty(displayedTodoList)){
            const updated = todoLists.find(todoList => todoList.id === id);
            setDisplayedTodoList(updated);
        }
    }

    
    const handleFilter = () => {

        if(displayedTodoList){
             if(showCompletedTodos){
                setFilteredTodoList(displayedTodoList);
            } else {
                const filteredTodos = displayedTodoList.todos?.filter((todo => todo.isDone === false));
                setFilteredTodoList(prevTodoList => ({
                    ...prevTodoList,
                    todos: filteredTodos
                }));           
            }
        } else {
            return null;
        }
    };

    return (
        <>
            { 
                isEmpty(displayedTodoList) ? 
                (
                    <h2 className="todolist-message">
                        Hi there 👋,<br /> choose your todo list!
                    </h2>
                )
                : 
                (
                    <div className="todolist">

                        {/* setting icon, show menu by clicking */}
                        {
                            !isEditName &&
                            <TodoListSetting 
                                showCompletedTodos={showCompletedTodos}
                                setShowCompletedTodos={setShowCompletedTodos}
                            />
                        }
                        
                        <TodoListName 
                            isEditName={isEditName}
                            setIsEditName={setIsEditName}
                        />

                        <TodoListNote
                            filteredTodoList={filteredTodoList}
                            idGenerator={idGenerator}
                        />         
                    </div>
                )
            }
        </>
    );
}
 
export default TodoList;