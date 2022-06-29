import { useEffect, useState } from 'react';


import TodoForm from "./TodoForm";
import TodoListSetting from './TodoListSetting';
import Todo from './Todo';
import TodoListName from './TodoListName';

const TodoList = ( { displayedTodoList, todoLists, setTodoLists, idGenerator } ) => {

    const { id: listId, name: listName, icon } = displayedTodoList;

    console.log(displayedTodoList.id)
   
    const [todos, setTodos] = useState([]);
    const [input, setInput] = useState('');
    const [isEditName, setIsEditName] = useState(false);

    const [showCompletedTodos, setShowCompletedTodos] = useState(true);
    const [filteredTodos, setFilteredTodos] = useState([]);

    useEffect(() => {
        getTodos();
    }, [])

    useEffect(() => {
        handleFilter();
    }, [todos, showCompletedTodos, todoLists])

    useEffect(() => {
        updateTodoList(listId);
    },[todos])

    const isEmpty = (obj) => {
        return JSON.stringify(obj) === JSON.stringify({});
    }

    // !
    const getTodos = () => {
        if(todoLists){
            const found = todoLists.find(todoList => todoList.id === listId);
            if(found){
                setTodos(found.todos);
            } else {
                setTodos([]);
            }
        } else {
            setTodos([]);
        }
    };

    const updateTodoList = (listId) => {
        setTodoLists((prevTodoLists => prevTodoLists.map(todoList => (
            todoList.id === listId ?
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
            setFilteredTodos((prevTodos => prevTodos.filter(todo => todo.isDone === false)));
        }
    };

    return (
        <>
            { 
                isEmpty(displayedTodoList) ? 
                (
                    <h3 className="todolist">
                        Hi there 👋,<br /> choose your List to show!
                    </h3>
                )
                : 
                (
                    <div className="todolist">

                        {/* setting icon */}
                        {
                            !isEditName &&
                            <TodoListSetting 
                                listId={listId}
                                setTodoLists={setTodoLists}
                                showCompletedTodos={showCompletedTodos}
                                setShowCompletedTodos={setShowCompletedTodos}
                            />
                        }
                        
                        <TodoListName 
                            listId={listId}
                            icon={icon}
                            listName={listName}
                            setTodoLists={setTodoLists}
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
                                    listId={listId}
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