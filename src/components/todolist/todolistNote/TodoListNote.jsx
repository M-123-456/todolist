import { useState } from 'react';
import Todo from "./Todo";
import TodoForm from "./TodoForm";

const TodoListNote = ( { filteredTodoList, idGenerator } ) => {


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
                                        filteredTodos={filteredTodoList.todos}
                                    />
                                )): null
                            }


                            {/* input form of new todo */}
                            <li>
                                <TodoForm
                                    idGenerator={idGenerator}
                                    filteredListId={filteredTodoList.id}
                                />
                            </li>
                        </ul>          
    );
}
 
export default TodoListNote;