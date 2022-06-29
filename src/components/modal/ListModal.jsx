import { useState } from 'react';

import { IoIosCloseCircle } from 'react-icons/io';
import Picker from 'emoji-picker-react';

const ListModal = ( { addTodoList, handleChangeName, listName, setIsModal, chosenEmoji, setChosenEmoji } ) => {
    const [showEmoji, setShowEmoji] = useState(false);

    const onEmojiClick = (e, emojiObject) => {
        setChosenEmoji(emojiObject);
        console.log(chosenEmoji);
        setShowEmoji(false);
    }

    return (
        <form 
            onSubmit={(e) => addTodoList(e, chosenEmoji)} 
            className="modal"
        >
            {/* close button */}
            <IoIosCloseCircle 
                onClick={() => setIsModal(false)}
                className="icon close"
            />

            {/* field to choose and show chosen emoji */}
            <div className="modal-emoji-picker">                
                <div
                className="button"
                onClick={() => setShowEmoji(prev => !prev)}
                >
                    <span>
                        {showEmoji ? 'Hide emojis' : 'Choose icon'}
                    </span> 
                </div>                
                <div className="emoji">
                    <span>
                        {chosenEmoji ? chosenEmoji.emoji : 'No icon'}
                    </span>
                </div>                
            </div>

            {/* show emoji-picker when showEmoji is true */}
            {
                showEmoji &&
                <Picker 
                    onEmojiClick={onEmojiClick}
                    className="emoji-window" 
                />
            }

            {/* field to input list name */}
            <input 
                type="text"
                className={showEmoji ? "hide" : ""} 
                value={listName} 
                placeholder="Name of your new todo list"
                onChange={handleChangeName}
                autoFocus
            />
            
            <button className="button">
                Create!
            </button>

            
        </form>
    );
}
 
export default ListModal;