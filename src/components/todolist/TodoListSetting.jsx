import { useState, useContext } from 'react';
import { AiFillSetting } from 'react-icons/ai';
import { IoIosCloseCircle } from 'react-icons/io';

import { TodoListsContext } from '../../provider/TodoListsProvider';


const TodoListSetting = ( { showCompletedTodos, setShowCompletedTodos } ) => {
    const { setTodoLists, displayedTodoList, setDisplayedTodoList } = useContext(TodoListsContext);

    const [showSetting, setShowSetting] = useState(false);
    

    const removeTodoList = (id) => {
        setTodoLists(prevTodoLists => prevTodoLists.filter((todoList) => todoList.id !== id));
        setShowSetting(false);
        setDisplayedTodoList({});
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
                    <li onClick={() => removeTodoList(displayedTodoList.id)}>
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