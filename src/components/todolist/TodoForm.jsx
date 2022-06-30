const TodoForm = ( { input, setInput, addTodo } ) => {
    
    const handleChangeInput = (e) => {
        setInput(e.target.value);
    }

    return (
        <form  
            onSubmit={addTodo}>
            <div className="todo">
                <input
                className="todo-input"
                type="text" 
                name="todo" 
                value={input}
                placeholder='New todo...'
                onChange={handleChangeInput}
                autoFocus
                />
            </div>
        </form>
    );
}
 
export default TodoForm;