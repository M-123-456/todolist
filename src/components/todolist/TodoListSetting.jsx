import { useState } from 'react';
import { AiFillSetting } from 'react-icons/ai';
import { IoIosCloseCircle } from 'react-icons/io';
import ListModal from '../modal/ListModal';


const TodoListSetting = ( { listId, setTodoLists, showCompletedTodos, setShowCompletedTodos } ) => {
    const [showSetting, setShowSetting] = useState(false);
    const [isEditList, setIsEditList] = useState(false);
    

    const removeTodoList = (listId) => {
        setTodoLists(prevTodoLists => prevTodoLists.filter((todoList) => todoList.id !== listId));
        setShowSetting(false);
        //! re-rendering needed
    }

    const handleShowCompletedTodos = () => {
        setShowCompletedTodos(prev => !prev);
        setShowSetting(false);
    }


    return (
        <div className="todolist-setting">
            <AiFillSetting 
                onClick={() => setShowSetting(true)}
                className={showSetting ? "hide" : "icon"}
            />
            
            <div className={showSetting ? "menubox" : "hide"}>
                <IoIosCloseCircle 
                    onClick={() => setShowSetting(false)}
                    className="icon close"
                />
                <ul className="todolist-setting-menu">
                    <li onClick={() => removeTodoList(listId)}>
                        Delete list
                    </li>
                    <li onClick={handleShowCompletedTodos}>
                        <span>
                            {
                                showCompletedTodos ?
                                "Hide " : "Show "
                            }
                        </span>
                        completed tasks
                    </li>
                </ul>
            </div>
        </div>
    );
}
 
export default TodoListSetting;