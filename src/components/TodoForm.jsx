import { useState } from 'react';
const TodoForm = ( { input, setInput, addTodo, setIsEdit, editInput, setEditInput, updateTodo, id  } ) => {
    const [isInputMode, setIsInputMode] = useState(false);

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
                className="edit todo-card" 
                onSubmit={editInput ? (e) => updateTodo(e, id) : addTodo}>
                <div className="todo">
                    <input
                    className="edit todo-input"
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