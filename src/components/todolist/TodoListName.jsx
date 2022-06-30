import { useState, useContext, useEffect } from 'react';
import Picker from 'emoji-picker-react';
import { MdSystemUpdateAlt } from 'react-icons/md';

import { TodoListsContext } from '../../provider/TodoListsProvider';

const TodoListName = ( { isEditName, setIsEditName }) => {

    const { setTodoLists, displayedTodoList } = useContext(TodoListsContext);
    const [editName, setEditName] = useState(displayedTodoList.name || "");
    const [editIcon, setEditIcon] = useState(displayedTodoList.icon || "");
    const [chosenEmoji, setChosenEmoji] = useState(displayedTodoList.icon || "");
    const [showEmoji, setShowEmoji] = useState(false);

    const onEmojiClick = (e, emojiObject) => {
        setChosenEmoji(emojiObject);
        setEditIcon(chosenEmoji.emoji);
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
                        onSubmit={(e) => handleSubmit(e, displayedTodoList.id)}
                    >
                        <div className="list-name-input">
                            <div 
                                className="list-title"
                            >
                                {chosenEmoji ? chosenEmoji : ''}
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
                        </div>
                        
                        {
                            showEmoji &&
                            <div className="emoji-picker">
                                <Picker 
                                    onEmojiClick={onEmojiClick}
                                    className="form-list-emoji" 
                                />
                            </div>
                        }
                    </form>

                ):
                (
                    <div 
                    onClick={() => setIsEditName(prev => !prev)}
                    >
                        <div className="list-title">
                            <span className="list-emoji">
                                {editIcon}
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