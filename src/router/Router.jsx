import { Routes, Route } from 'react-router-dom';
import Home from '../components/Home';
import TodoList from '../components/TodoList';


const Router = ( { todoLists, setTodoLists } ) => {
    return (
        <Routes>
            <Route 
                path="/*"
                element={<Home />}
            />
            {/* {todoLists.map((todoList) => (
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
            ))}             */}
        </Routes>
    );
}
 
export default Router;