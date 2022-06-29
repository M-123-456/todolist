import { useState } from 'react';
import Header from './Header';
import ListModal from './modal/ListModal';
import SideBar from './navigation/SideBar';
import TodoList from './todolist/TodoList';



const Home = () => {
    const [todoLists, setTodoLists] = useState([]);
    const [displayedTodoList, setDisplayedTodoList] = useState({});

    const [showNav, setShowNav] = useState(false);

    // States for Modal
    const [isModal, setIsModal] = useState(false);
    const [listName, setListName] = useState('');
    const [chosenEmoji, setChosenEmoji] = useState(null);

    //! log
    console.log('todoLists', todoLists)
    console.log('displayedTodoList', displayedTodoList)

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

    const isEmpty = (obj) => {
        return JSON.stringify(obj) === JSON.stringify({});
    }
    
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
            <Header 
                displayedTodoList={displayedTodoList}
            />

            {/* side bar navigation to show chosen todo list in TodoList */}
            <SideBar
                setIsModal={setIsModal}
                todoLists={todoLists}
                setShowNav={setShowNav}
                showNav={showNav}
                setDisplayedTodoList={setDisplayedTodoList}
            />

            {/* show Modal to input list name and icon when is Modal is on */}
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

            {
                isEmpty(displayedTodoList) ?
                (<div>Hi there 👋,<br /> choose your List to show!</div>)
                :
                <TodoList 
                displayedTodoList={displayedTodoList}
                todoLists={todoLists}
                setTodoLists={setTodoLists}
                />              

            }
             

            {/* <div>
                {todoLists.map((todoList) => (
                    <TodoList
                        key={todoList.id}
                        todoLists={todoLists}  
                        setTodoLists={setTodoLists}
                        listId={todoList.id}
                        listName={todoList.name}                        
                    />
                ))}
            </div> */}
        </div>
        
    );
}
 
export default Home;