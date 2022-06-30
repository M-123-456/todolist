import { useState } from 'react';
import Picker from 'emoji-picker-react';
import { MdSystemUpdateAlt } from 'react-icons/md';


const TodoListName = ( {listId, icon, listName, setTodoLists, isEditName, setIsEditName}) => {
    const [editName, setEditName] = useState(listName || "");
    const [chosenEmoji, setChosenEmoji] = useState(icon || "");
    const [showEmoji, setShowEmoji] = useState(false);

    console.log(chosenEmoji);

    const onEmojiClick = (e, emojiObject) => {
        setChosenEmoji(emojiObject);
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
                icon: chosenEmoji.emoji
            }: todoList
        )));
        setIsEditName(false);
    }


    return (
        <>
            {
                isEditName ?
                (
                    <form 
                        className="form-list-name"
                        onSubmit={(e) => handleSubmit(e, listId)}
                    >
                        <div 
                            className="list-title"
                        >
                            {chosenEmoji ? chosenEmoji.emoji : ''}
                        </div>
                        <input 
                            className="list-title"
                            value={editName}
                            onChange={handleChange}
                            autoFocus 
                            />   
                        <div
                            className="button"
                            onClick={() => setShowEmoji(prev => !prev)}                            
                            >
                                <span>
                                    {showEmoji ? 'Hide emojis' : 'Choose icon'}
                                </span> 
                        </div>

                        <button className="update-button">
                            <MdSystemUpdateAlt 
                            className="icon"
                            />
                        </button>
                        

                        {
                            showEmoji &&
                            <Picker 
                                onEmojiClick={onEmojiClick}
                                className="form-list-emoji" 
                            />
                        }
                    </form>

                ):
                (
                    <div 
                    onClick={() => setIsEditName(prev => !prev)}
                    >
                        <div className="list-title">
                            <span className="list-emoji">
                                {chosenEmoji.emoji}
                            </span>
                            {editName}
                        </div>            
                    </div>
                )
            }

            
        </>
        
    );
}
 
export default TodoListName;