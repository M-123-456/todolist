import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';


import TodoForm from "./TodoForm";
import Todos from "./Todos";
import TodoListSetting from './TodoListSetting';

const TodoList = ( { todoLists, setTodoLists, listId, listName } ) => {
   
    const [todos, setTodos] = useState([]);
    const [input, setInput] = useState('');
    const [filteredTodos, setFilteredTodos] = useState([]);

    useEffect(() => {
        handleFilter();
    },[todos]);

    useEffect(() => {
        getTodos();
    }, [])

    useEffect(() => {
        updateTodoList(listId);
    }, [todos])

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
        if(todos){
            setTodos((todos) => ([
                ...todos, 
                {
                    id: nanoid(),
                    todo: input,
                    isDone: false
                }
            ]))
        } else {
            setTodos([
                {
                    id: nanoid(),
                    todo: input,
                    isDone: false
                }
            ])
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
        setFilteredTodos((prevTodos => prevTodos.filter(todo => todo.isDone === false)));
    }

    return (
        <div className="todolist">
            <TodoListSetting 
                listId={listId}
                setTodoLists={setTodoLists}
            />
            <h2>{listName}</h2>
            <Todos
                completeTodo={completeTodo}
                removeTodo={removeTodo}
                todos={todos}
                setTodos={setTodos}
                listId={listId}
            />
            <TodoForm
                input={input}
                setInput={setInput}
                addTodo={addTodo}
                listId={listId}
            />
        </div>
    );
}
 
export default TodoList;