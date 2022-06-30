import { useEffect, useState, useContext } from 'react';

import { TodoListsContext } from '../../provider/TodoListsProvider';


import TodoForm from "./TodoForm";
import TodoListSetting from './TodoListSetting';
import Todo from './Todo';
import TodoListName from './TodoListName';

const TodoList = ( {  idGenerator } ) => {

    const { todoLists, setTodoLists, displayedTodoList, setDisplayedTodoList } = useContext(TodoListsContext);

    const [todos, setTodos] = useState([]);
    const [input, setInput] = useState('');
    const [filteredTodos, setFilteredTodos] = useState([]);


    // state used in TodoListName when changing list name or icon
    const [isEditName, setIsEditName] = useState(false);

    const [showCompletedTodos, setShowCompletedTodos] = useState(true);

    console.log('filteredTodos', filteredTodos);
    console.log('todos', todos);

    // useEffect(() => {
    //     getTodos();
    // }, [])

    useEffect(() => {
        handleFilter();
    }, [showCompletedTodos, todoLists])

    useEffect(() => {
        updateTodoList(displayedTodoList.id);
    },[todos]);


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

    const updateTodoList = (id) => {
        setTodoLists((prevTodoLists => prevTodoLists.map(todoList => (
            todoList.id === id ?
            {
                ...todoList,
                todos: todos 
            }
            : todoList
        ))));
    };



    const addTodo = (e) => {
        e.preventDefault();

        const newTodo = {
            id: idGenerator(),
            todo: input,
            isDone: false
        }

        if(todos){
            setTodos((todos) => ([
                ...todos, 
                newTodo
            ]))
        } else {
            setTodos([newTodo])
        }
        setInput('');
    }    

    const completeTodo = (e, id) => {
        e.stopPropagation();
        setTodos(prevTodos => prevTodos.map(todo => (
        todo.id === id ?
            { ...todo, isDone: !todo.isDone }
            : todo
        )));
    };

    const removeTodo = (id) => {
        setTodos(prevTodos => prevTodos.filter((todo) => todo.id !== id));
    }

    const handleFilter = () => {
        if(showCompletedTodos){
            setFilteredTodos(todos);
        } else {
            const filtered = todos.filter((todo => todo.isDone === false));
            setFilteredTodos(filtered);
        }
    };

    return (
        <>
            { 
                isEmpty(displayedTodoList) ? 
                (
                    <h2 className="todolist todo-list-message">
                        Hi there 👋,<br /> choose your todo list!
                    </h2>
                )
                : 
                (
                    <div className="todolist">

                        {/* setting icon */}
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
                        
                        <ul className="todolist-list">
                            {/* if there are todos, show todos */}
                            {
                                filteredTodos ? filteredTodos.map((todo) => (
                                    <Todo
                                        key={todo.id}
                                        id={todo.id}
                                        todo={todo.todo}
                                        isDone={todo.isDone}
                                        completeTodo={completeTodo}
                                        removeTodo={removeTodo}
                                        todos={todos}
                                        setTodos={setTodos}
                                    />
                                )) : null
                            }


                            {/* input form of new todo */}
                            <li>
                                <TodoForm
                                    input={input}
                                    setInput={setInput}
                                    addTodo={addTodo}
                                />
                            </li>
                        </ul>                 
                    </div>
                )
            }
            
        
        </>
    );
}
 
export default TodoList;