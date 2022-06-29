import { useState } from 'react';
import Picker from 'emoji-picker-react';


const TodoListName = ( {listId, icon, listName, setTodoLists }) => {
    const [isEdit, setIsEdit] = useState(false);
    const [editName, setEditName] = useState(listName)
    const [chosenEmoji, setChosenEmoji] = useState(icon);
    const [showEmoji, setShowEmoji] = useState(false);

    const onEmojiClick = (e, emojiObject) => {
        setChosenEmoji(emojiObject);
        console.log(chosenEmoji);
        setShowEmoji(false);
    }

    const handleChange = (e) => {
        setEditName(e.target.value);
    }

    const handleSubmit = (e, id) => {
        e.preventDefault();

        setTodoLists(prevTodoLists => prevTodoLists.map(todoList => (
            todoList.id === id ? 
            {
                ...todoList,
                name: editName,
                icon: chosenEmoji
            }: todoList
        )));
        setIsEdit(false);
    }


    return (
        <>
            {
                isEdit ?
                (
                    <form 
                        className="form-list-name"
                        onSubmit={(e) => handleSubmit(e, listId)}
                    >
                        <div className="emoji">
                            {chosenEmoji ? chosenEmoji.emoji : 'No icon'}
                        </div>  
                        <input 
                            class="todo-input"
                            value={editName}
                            onChange={handleChange}
                            autoFocus 
                        />
                        <div className="modal-emoji-picker">                
                            <div
                            className="button"
                            onClick={() => setShowEmoji(prev => !prev)}
                            >
                                <span>
                                    {showEmoji ? 'Hide emojis' : 'Choose icon'}
                                </span> 
                            </div>  
                        </div>
                        {
                            showEmoji &&
                            <Picker 
                                onEmojiClick={onEmojiClick}
                                className="emoji-window" 
                            />
                        }
                        <button>
                            Change
                        </button>
                    </form>

                ):
                (
                    <div onClick={() => setIsEdit(prev => !prev)}>
                        <h2>
                            <span className="list-emoji">
                                {icon.emoji}
                            </span>
                            {listName}
                        </h2>            
                    </div>
                )
            }

            
        </>
        
    );
}
 
export default TodoListName;