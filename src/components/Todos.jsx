import Todo from './Todo';

const Todos = ( { completeTodo, removeTodo, todos, setTodos } ) => {
    return (
        <div>
            {todos.map((todo) => (
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
            ))}
        </div>
    );
}
 
export default Todos;