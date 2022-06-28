import { useState } from 'react';
import { AiFillSetting } from 'react-icons/ai';
import { IoIosCloseCircle } from 'react-icons/io';


const TodoListSetting = ( { removeTodoList } ) => {
    const [showSetting, setShowSetting] = useState(false);

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
                    <li
                        onClick={removeTodoList}
                    >
                        Delete list
                    </li>
                    <li>
                        Change List Name
                    </li>
                    <li>
                        Show completed tasks
                    </li>
                </ul>
            </div>
        </div>
    );
}
 
export default TodoListSetting;