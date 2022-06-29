import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';


import TodoForm from "./TodoForm";
import Todos from "./NotNeededTodos";
import TodoListSetting from './TodoListSetting';
import Todo from './Todo';

const TodoList = ( { displayedTodoList, todoLists, setTodoLists } ) => {

    const { id: listId, name: listName, icon } = displayedTodoList;

    console.log(displayedTodoList.id)
   
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

            {/* setting icon */}
            <TodoListSetting 
                listId={listId}
                setTodoLists={setTodoLists}
            />

            <h2><span>{icon.emoji}</span>{listName}</h2>

            {/* if there are todos, show todos */}
            {
                todos ? todos.map((todo) => (
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