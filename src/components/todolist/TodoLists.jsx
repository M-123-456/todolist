import { useState } from 'react';
import ListModal from '../modal/ListModal';
import SideBar from '../SideBar';
import TodoList from './TodoList';



const TodoLists = () => {
    const [todoLists, setTodoLists] = useState([]);
    const [listName, setListName] = useState('');
    const [chosenEmoji, setChosenEmoji] = useState(null);
    const [isModal, setIsModal] = useState(false);

    console.log('todoLists', todoLists)

    // LocalStorage
    // useEffect(() => {
    //     getLocalTodoLists();
    // }, []);

    // useEffect(() => {
    //     saveLocalTodoLists();
    // },[todoLists])

    // const saveLocalTodoLists = () => {
    //    localStorage.setItem('todoLists', JSON.stringify(todoLists));
    // };

    // const getLocalTodoLists = () => {
    //     if(localStorage.getItem('todoLists') === null){
    //         localStorage.setItem('todoLists', JSON.stringify([]));
    //     } else {
    //         const todoListLocal = JSON.parse(localStorage.getItem('todoLists'));
    //         setTodoLists(todoListLocal);
    //     }
    // };

    const idGenerator = () => {
        return (performance.now().toString(36) + Math.random().toString(36)).replace(/\./g, '');
    }
    
    const handleChangeName = (e) => {
        setListName(e.target.value);
    }

    const addTodoList = (e) => {
        e.preventDefault();
        
        const newTodoList = {
            id: idGenerator(),
            name: listName,
            icon: chosenEmoji || '',
        }

        setTodoLists((prevTodoLists) => ([
            ...prevTodoLists,
            newTodoList
        ]));

        setIsModal(false);
        setListName('');
    }

    return (
        <div className="todolists">
            <SideBar
                setIsModal={setIsModal}
                todoLists={todoLists}
            />
            {
                isModal && 
                <ListModal 
                addTodoList={addTodoList}
                handleChangeName={handleChangeName}
                listName={listName}
                setIsModal={setIsModal}
                chosenEmoji={chosenEmoji}
                setChosenEmoji={setChosenEmoji}
            />

            }         
            
            <div>
                {todoLists.map((todoList) => (
                    <TodoList
                        key={todoList.id}
                        todoLists={todoLists}  
                        setTodoLists={setTodoLists}
                        listId={todoList.id}
                        listName={todoList.name}                        
                    />
                ))}
            </div>
        </div>
        
    );
}
 
export default TodoLists;