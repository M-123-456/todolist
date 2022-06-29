import { AiFillCloseSquare } from 'react-icons/ai';
import { FcMenu } from 'react-icons/fc'

const SideBar = ( { setIsModal, todoLists, setShowNav, showNav, setDisplayedTodoList } ) => {

    const handleSelectedTodoList = (e) => {
        const found = todoLists.find((todoList => (todoList.id === e.target.id)));
        console.log(found);
        setDisplayedTodoList(found);
    }

    return (
        <nav>
            {/* show navigation bar if show Nav is true, otherwise hamburger menu */}

            {
                showNav ? 
                (
                    <div className="nav-open">
                        <AiFillCloseSquare 
                        className="icon nav-close"
                        onClick={() => setShowNav(false)} 
                        />
                        <ul>

                            {/* trigger ListModal when clicked */}
                            <li
                                onClick={() => setIsModal(true)}
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
                                                onClick={(e) => handleSelectedTodoList(e)}
                                            >
                                                <span>
                                                    {todoList.icon.emoji}
                                                </span>
                                                {todoList.name}
                                            </li>
                                    ))
                                    ) : null
                                }
                        </ul>
                    </div>
                ):
                <FcMenu 
                className="icon button hamburger"
                onClick={() => setShowNav(true)}
                />
            }            
        </nav>
        
    );
}
 
export default SideBar;