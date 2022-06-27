import { Routes, Route } from 'react-router-dom';
import Home from '../components/Home';
import TodoList from '../components/TodoList';


const Router = ( ) => {
    return (
        <Routes>
            <Route 
                path="/*"
                element={<Home />}
            />
            {/* {todoLists.map((todoList) => (
                <Route 
                    path={todoList.id}
                    element={
                        <TodoList 
                            listId={todoList.id}
                            listName={todoList.name}
                        />
                    } 
                />
            ))} */}

            
        </Routes>
    );
}
 
export default Router;