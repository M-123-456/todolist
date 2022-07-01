import { useState, useEffect, useContext } from 'react';
import Todo from "./Todo";
import TodoForm from "./TodoForm";
import { TodoListsContext } from '../../../provider/TodoListsProvider';

const TodoListNote = ( { filteredTodoList, idGenerator } ) => {

    const { setTodoLists, displayedTodoList } = useContext(TodoListsContext);
    const [todos, setTodos] = useState(displayedTodoList.todos || []);

    useEffect(() => {
        updateTodoLists();
    }, [todos]);

    useEffect(() => {
        updateTodos();
    }, [displayedTodoList]);

    const updateTodos = () => {
        setTodos(displayedTodoList.todos);
    }

    const updateTodoLists = () => {
        setTodoLists((prevTodoLists => {
            return prevTodoLists.map(todoList => {
                if(todoList.id === filteredTodoList.id) {
                    return {
                        ...todoList,
                        todos: todos
                    }
                } else {
                    return todoList;
                }
            })
        }));
    }


    return (
        <ul className="todolist-list">
                            {/* if there are todos, show todos */}
                            {
                                filteredTodoList.todos ?
                                filteredTodoList.todos.map(todo => (
                                    <Todo
                                        key={todo.id}
                                        id={todo.id}
                                        todo={todo.todo}
                                        isDone={todo.isDone}
                                        listId={filteredTodoList.id}
                                        todos={todos}
                                        setTodos={setTodos}
                                    />
                                )): null
                            }


                            {/* input form of new todo */}
                            <li>
                                <TodoForm
                                    idGenerator={idGenerator}
                                    filteredListId={filteredTodoList.id}
                                    todos={todos}
                                    setTodos={setTodos}
                                />
                            </li>
                        </ul>          
    );
}
 
export default TodoListNote;