
const SideBar = ( { setIsModal, todoLists } ) => {

    return (
        <ul>
            <li
                onClick={() => setIsModal(true)}
            >
                Create New Todo List
            </li>
            {
                todoLists ? 
                (
                    todoLists.map((todoList) => (
                    <li key={todoList.id}>
                        <span>
                            {todoList.icon.emoji}
                        </span>
                        {todoList.name}
                    </li>
                ))
                ) : null
            }
        </ul>
        
    );
}
 
export default SideBar;