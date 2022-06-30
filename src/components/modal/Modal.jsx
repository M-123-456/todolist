import { useState, useContext } from 'react';

import { TodoListsContext } from '../../provider/TodoListsProvider';

import { IoIosCloseCircle } from 'react-icons/io';
import Picker from 'emoji-picker-react';

const ListModal = ( { idGenerator, setDisplayedTodoList, setIsModal } ) => {
    const { setTodoLists } = useContext(TodoListsContext);
    
    const [listName, setListName] = useState('');
    const [chosenEmoji, setChosenEmoji] = useState(null);
    const [showEmoji, setShowEmoji] = useState(false);

    const onEmojiClick = (e, emojiObject) => {
        setChosenEmoji(emojiObject);
        setShowEmoji(false);
    }

    const handleChangeName = (e) => {
        setListName(e.target.value);
    }

    const createTodoList = (e) => {
        e.preventDefault();
        
        const newTodoList = {
            id: idGenerator(),
            name: listName,
            icon: chosenEmoji || '',
            todos: []
        }

        setTodoLists((prevTodoLists) => ([
            ...prevTodoLists,
            newTodoList
        ]));

        setIsModal(false);
        setDisplayedTodoList(newTodoList);
        setListName('');
        setChosenEmoji(null);
    }

    return (
        <form 
            onSubmit={(e) => createTodoList(e, chosenEmoji)} 
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
                className="button modal-button"
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
            
            <button className="button modal-submit-button">
                Create!
            </button>

            
        </form>
    );
}
 
export default ListModal;