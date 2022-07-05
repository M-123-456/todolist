import { useState, useContext, useEffect } from 'react';
import Picker from 'emoji-picker-react';
import { MdSystemUpdateAlt } from 'react-icons/md';

import { TodoListsContext } from '../../provider/TodoListsProvider';

const TodoListName = ( { isEditName, setIsEditName }) => {

    const { setTodoLists, displayedTodoList } = useContext(TodoListsContext);
    const [editName, setEditName] = useState(displayedTodoList.name || "");
    const [editIcon, setEditIcon] = useState(displayedTodoList.icon || "");
    const [chosenEmoji, setChosenEmoji] = useState("");
    const [showEmoji, setShowEmoji] = useState(false);

    console.log(editIcon);

    useEffect(() => {
        setEditIcon(chosenEmoji.emoji)
    }, [chosenEmoji])

    useEffect(() => {
        setEditIcon(displayedTodoList.icon );
        setEditName(displayedTodoList.name);
    }, [displayedTodoList])


    const onEmojiClick = (e, emojiObject) => {
        setChosenEmoji(emojiObject);
        setShowEmoji(false);
    }

    const handleChange = (e) => {
        setEditName(e.target.value);
    }

    const handleChangeIcon = (e) => {
        setEditIcon(e.target.value.emoji);
    }

    const handleSubmit = (e, id) => {
        e.preventDefault();

        setTodoLists(prevTodoLists => prevTodoLists.map(todoList => (
            todoList.id === id ? 
            {
                ...todoList,
                name: editName,
                icon: editIcon,
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
                                value={editIcon}
                                name="icon"
                                onChange={handleChangeIcon}
                            >
                                {editIcon ? editIcon : ''}
                            </div>
                            <input 
                                className="list-title"
                                value={editName}
                                name="input"
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
                        className="list-name" 
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