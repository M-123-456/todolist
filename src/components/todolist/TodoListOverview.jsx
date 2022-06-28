import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { AiFillPlusCircle } from 'react-icons/ai';
import ListModal from '../modal/ListModal';
import TodoList from './TodoList';



const TodoListOverview = () => {
    const [todoLists, setTodoLists] = useState([]);
    const [listName, setListName] = useState('');
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
            <AiFillPlusCircle 
                onClick={() => setIsModal(true)}
                className={isModal ? 'hide' : 'icon plusIcon'}
            />
            {
                isModal && 
                <ListModal 
                addTodoList={addTodoList}
                handleChangeName={handleChangeName}
                listName={listName}
                setIsModal={setIsModal}
            />

            }
            
            <ul 
                className={isModal ? 'hide' : ''}
            >
                {todoLists.map((todoList) => (
                <li key={todoList.id}>
                    <Link to={todoList.id}>
                        {todoList.name}
                    </Link>
                </li>
                ))}
            </ul>

            <div>
                {todoLists.map((todoList) => (
                    <Route 
                        path={`/${todoList.id}`}
                        key={todoList.id}
                        element={
                            <TodoList
                                key={todoList.id}
                                todoLists={todoLists}  
                                setTodoLists={setTodoLists}
                                listId={todoList.id}
                                listName={todoList.name}                        
                            />
                        }
                    />
                ))}
            </div>
        </div>
        
    );
}
 
export default TodoListOverview;