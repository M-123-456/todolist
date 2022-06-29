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
        setDisplayedTodoList(newTodoList);
        setListName('');
        setChosenEmoji(null);
    }

    return (
        <div className="home">          
            <Header displayedTodoList={displayedTodoList}/>

            {/* side bar navigation to show chosen todo list in TodoList */}
            <SideBar
                setIsModal={setIsModal}
                todoLists={todoLists}
                setShowNav={setShowNav}
                showNav={showNav}
                setDisplayedTodoList={setDisplayedTodoList}
            /> 

            {
                !isModal && 
                <TodoList 
                displayedTodoList={displayedTodoList}
                todoLists={todoLists}
                setTodoLists={setTodoLists}
                idGenerator={idGenerator}
                />
            }            

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
        </div>
    );
}
 
export default Home;