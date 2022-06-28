const TodoForm = ( { input, setInput, addTodo } ) => {
    
    const handleChangeInput = (e) => {
        setInput(e.target.value);
    }

    return (
        <form 
            className="edit todo-card" 
            onSubmit={addTodo}>
            <div className="todo">
                <input
                className="edit todo-input"
                type="text" 
                name="todo" 
                // ref={inputRef}
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