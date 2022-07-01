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


    // useEffect(() => {
    //     getTodos();
    // }, [])

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

    // const updateTodos = (id) => {
    //     const matched = todoLists.find(todoList => todoList.id === id);
    //     setTodos(matched.todos);
    // }    

    // const updateTodoList = (id) => {
    //     setTodoLists((prevTodoLists => prevTodoLists.map(todoList => (
    //         todoList.id === id ?
    //         {
    //             ...todoList,
    //             todos: todos 
    //         }
    //         : todoList
    //     ))));
    // };

    const updateDisplayedTodoList = (id) => {
        if(!isEmpty(displayedTodoList)){
            const updated = todoLists.find(todoList => todoList.id === id);
            setDisplayedTodoList(updated);
        }
    }

    // const addTodo = (e, id) => {
    //     e.preventDefault();

    //     setTodoLists((prevTodoLists => prevTodoLists.map(todoList => (
    //         todoList.id === id ?
    //         {
    //             ...todoList,
    //             id: idGenerator(),
    //             todos: input,
    //             isDone: false
    //         }: todoList
    //     ))));
    //     setInput('');
    // }    

    // const completeTodo = (e, id) => {
    //     e.stopPropagation();
    //     setTodos(prevTodos => prevTodos.map(todo => (
    //     todo.id === id ?
    //         { ...todo, isDone: !todo.isDone }
    //         : todo
    //     )));
    // };

    // const removeTodo = (id) => {
    //     setTodos(prevTodos => prevTodos.filter((todo) => todo.id !== id));
    // }

    const handleFilter = () => {

        if(displayedTodoList){
             if(showCompletedTodos){
                setFilteredTodoList(displayedTodoList);
            } else {
                const filtered = displayedTodoList.todos.filter((todo => todo.isDone === false));
                setFilteredTodoList(filtered);           
            }
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