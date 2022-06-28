import { useState } from 'react';

import { IoIosCloseCircle } from 'react-icons/io';
import { VscSmiley } from 'react-icons/vsc'
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
            <IoIosCloseCircle 
                onClick={() => setIsModal(false)}
                className="icon close"
            />
            <div className="modal-emoji">
                <div
                className="button" 
                onClick={() => setShowEmoji(true)}
                >
                    Choose icon <VscSmiley />
                </div>                
                <div>
                    {chosenEmoji ? chosenEmoji.emoji : 'No icon'}
                </div>
                {
                    showEmoji &&
                    <Picker onEmojiClick={onEmojiClick} />
                }
            </div>
            <input 
                type="text" 
                value={listName} 
                placeholder="Name of your new todo list"
                onChange={handleChangeName}
                autoFocus
            />
            

            
        </form>
    );
}
 
export default ListModal;