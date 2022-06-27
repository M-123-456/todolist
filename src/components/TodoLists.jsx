import { useState, useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { AiFillPlusCircle } from 'react-icons/ai';
import { nanoid } from 'nanoid';
import ListInfoModal from './ListInfoModal';
import TodoList from './TodoList';
import { TodoListContext } from '../provider/TodoListProvider';



const TodoLists = () => {
    const [todoLists, setTodoLists] = useState([]);
    const [listName, setListName] = useState('');
    const [isModal, setIsModal] = useState(false);


    console.log('todolist', todoLists)


    const handleChangeName = (e) => {
        setListName(e.target.value);
    }

    const addTodoList = (e) => {
        e.preventDefault();
        
        const newTodoList = {
            id: nanoid(),
            name: listName,
        }

        setTodoLists((prevTodoLists) => ([
            ...prevTodoLists,
            newTodoList
        ]));
        
        setListName('');
        setIsModal(false);
    }

    return (
        <div className="todolists">
            <AiFillPlusCircle 
                onClick={() => setIsModal(true)}
                className={isModal ? 'hide' : 'plusIcon'}
            />
            {
                isModal && 
                <ListInfoModal 
                addTodoList={addTodoList}
                handleChangeName={handleChangeName}
                listName={listName}
                setIsModal={setIsModal}
            />

            }
            
            <ul>
                {todoLists.map((todoList) => (
                <li>
                    <Link to={todoList.id}>{todoList.name}</Link>
                </li>
                ))}
            </ul>

            <Routes>
                {todoLists.map((todoList) => (
                    <Route 
                        path={`/${todoList.id}`}
                        element={
                            <TodoList
                                key={todoList.id}      
                                setTodoLists={setTodoLists}
                                listId={todoList.id}
                                listName={todoList.name}                        
                            />
                        }
                    />
                ))}
            </Routes>
        </div>
        
    );
}
 
export default TodoLists;