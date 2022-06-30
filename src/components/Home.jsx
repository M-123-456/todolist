import { useState, useContext } from 'react';

import { TodoListsContext } from '../provider/TodoListsProvider';

import Header from './Header';
import Modal from './modal/Modal';
import SideBar from './navigation/SideBar';
import TodoList from './todolist/TodoList';




const Home = () => {
    const { todoLists, displayedTodoList } = useContext(TodoListsContext);

    // const [displayedTodoList, setDisplayedTodoList] = useState({});
    const [showSideBar, setShowSideBar] = useState(false);
    const [isModal, setIsModal] = useState(false);
    
    //! log
    console.log('todoLists', todoLists)
    console.log('displayedTodoList', displayedTodoList)
    // console.log('displayedTodoListId', displayedTodoListId)

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
    

    return (
        <div className="home">          
            <Header/>

            {/* side bar navigation to show chosen todo list in TodoList */}
            <SideBar
                setIsModal={setIsModal}
                setShowSideBar={setShowSideBar}
                showSideBar={showSideBar}
                // setDisplayedTodoList={setDisplayedTodoList}
            /> 


            {/* show chosen todo list or message if modal is not on */}
            {
                !isModal && 
                <TodoList 
                idGenerator={idGenerator}
                />
            }            

            {/* show Modal to input list name and icon when is Modal is on */}
            {
                isModal && 
                <Modal
                idGenerator={idGenerator}
                setIsModal={setIsModal}
                />
            }             
        </div>
    );
}
 
export default Home;