
const TodoForm = ( { input, setInput, setTodos, addTodo, setIsEdit, editInput, setEditInput, updateTodo, id  } ) => {
    // const inputRef = useRef(null);

    // useEffect(() => {
    //     inputRef.current.focus();
    // })

    const handleChangeInput = (e) => {
        editInput ? 
        setEditInput(e.target.value)
        : setInput(e.target.value);
    }

    return (
        <div>
            <form 
                className="todo-card edit" 
                onSubmit={editInput ? (e) => updateTodo(e, id) : addTodo}>
                <div className="todo">
                    <input
                    className="todo-input edit"
                    type="text" 
                    name="todo" 
                    // ref={inputRef}
                    value={editInput ? editInput : input}
                    placeholder={!editInput ? 'New todo...': ''}
                    onChange={handleChangeInput}
                    // ! initiate => error
                    onBlur={() => setIsEdit(false)}     
                    autoFocus
                    />
                </div>
            </form>
        </div>

    );
}
 
export default TodoForm;