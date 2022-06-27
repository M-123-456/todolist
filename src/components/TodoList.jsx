import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';


import TodoForm from "./TodoForm";
import Todos from "./Todos";
import TodoListSetting from './TodoListSetting';

const TodoList = ( { setTodoLists, listId, listName } ) => {
    const [todos, setTodos] = useState([]);
    const [input, setInput] = useState('');
    const [filteredTodos, setFilteredTodos] = useState([]);


    console.log(todos);

    useEffect(() => {
        handleFilter();
    },[todos]);


    const addTodo = (e) => {
        e.preventDefault();

        const newTodos = [
        ...todos,
        {
            id: nanoid(),
            todo: input,
            isDone: false
        }
        ];

        setTodos(newTodos);
        setInput('');
    }

    const completeTodo = (id) => {
        setTodos(prevTodos => prevTodos.map(todo => (
        todo.id === id ?
            { ...todo, isDone: !todo.isDone }
            : todo
        )));
    };

    const removeTodo = (id) => {
        setTodos(prevTodos => prevTodos.filter((todo) => todo.id !== id));
    }

    // !
    const removeTodoList = () => {
        setTodoLists(prevTodoLists => prevTodoLists.filter((todoList) => todoList.id !== listId));
    }

    const handleFilter = () => {
        setFilteredTodos((prevTodos => prevTodos.filter(todo => todo.isDone === false)));
    }

    return (
        <div className="todolist">
            <TodoListSetting 
                removeTodoList={removeTodoList}
            />
            <h2>{listName}</h2>
            <Todos
                completeTodo={completeTodo}
                removeTodo={removeTodo}
                todos={todos}
                setTodos={setTodos}
            />
            <TodoForm
                input={input}
                setInput={setInput}
                setTodos={setTodos}
                addTodo={addTodo}
            />
        </div>
    );
}
 
export default TodoList;