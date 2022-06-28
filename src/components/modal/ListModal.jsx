import { IoIosCloseCircle } from 'react-icons/io';

const ListModal = ( { addTodoList, handleChangeName, listName, setIsModal } ) => {
    return (
        <form 
            onSubmit={addTodoList} 
            className="modal"
        >
            <IoIosCloseCircle 
                onClick={() => setIsModal(false)}
                className="icon close"
            />
            <input 
                type="text" 
                value={listName} 
                placeholder="Name of your new todo list"
                onChange={handleChangeName}
                autoFocus
            />
        </form>
    );
}
 
export default ListModal;