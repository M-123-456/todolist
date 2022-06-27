import { useState } from 'react';
import { AiFillSetting } from 'react-icons/ai';
import { IoIosCloseCircle } from 'react-icons/io';


const TodoListSetting = ( { removeTodoList } ) => {
    const [showSetting, setShowSetting] = useState(false);

    return (
        <div className="todolist-setting">
            <AiFillSetting 
                onClick={() => setShowSetting(true)}
                className={showSetting ? "hide" : "button"}
            />
            <div className={showSetting ? "menubox" : "hide"}>
                <IoIosCloseCircle 
                    onClick={() => setShowSetting(false)}
                    className="close"
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
                        something other
                    </li>
                </ul>
            </div>
        </div>
    );
}
 
export default TodoListSetting;