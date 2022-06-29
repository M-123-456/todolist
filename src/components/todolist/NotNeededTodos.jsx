import Todo from './Todo';

const Todos = ( { completeTodo, removeTodo, todos, setTodos, setIsEdit } ) => {
    return (
        <div>
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
                    setIsEdit={setIsEdit}
                    />
                )) : null

            }
        </div>
    );
}
 
export default Todos;