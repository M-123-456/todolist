import  { useState, useContext } from 'react';

import { AiFillCloseSquare } from 'react-icons/ai';
import { FcMenu } from 'react-icons/fc'

import { TodoListsContext } from '../../provider/TodoListsProvider';

const SideBar = ( { setIsModal, setShowSideBar, showSideBar } ) => {

    const { todoLists, setDisplayedTodoList } = useContext(TodoListsContext);

    const handleSelectedTodoList = (id) => {
        const found = todoLists.find(todoList => todoList.id === id);
        setDisplayedTodoList(found);
    }

    const handleClick = () => {
        setIsModal(true);
        setShowSideBar(false);
    }

    return (
        <nav>
            {/* show navigation bar if show Nav is true, otherwise hamburger menu icon */}
            <FcMenu 
                className={showSideBar ? "hide": "icon hamburger"}
                onClick={() => setShowSideBar(true)}
            />
           
            <div                
                className={showSideBar ?"sidebar-open" : "hide"}
            >
                <AiFillCloseSquare 
                className="icon nav-close"
                onClick={() => setShowSideBar(false)} 
                />
                <ul className="nav-list">

                    {/* Create new Todo List. Trigger ListModal when clicked */}
                    <li
                        onClick={handleClick}
                        >
                        Create New Todo List
                    </li>

                    {/* Todo Lists registered are shown as list when available. Trigger displayedTodoList when clicked */}
                        {
                            todoLists ? 
                            (
                                todoLists.map((todoList) => (
                                    <li 
                                        key={todoList.id}
                                        id={todoList.id}
                                        onClick={() => handleSelectedTodoList(todoList.id)}
                                    >
                                        <span>
                                            {todoList.icon}
                                        </span>
                                        {todoList.name}
                                    </li>
                            ))
                            ) : null
                        }
                </ul>
            </div>
        </nav>
        
    );
}
 
export default SideBar;