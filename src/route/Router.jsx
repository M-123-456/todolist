import { Routes, Route } from 'react-router-dom';
import TodoListsProvider from '../provider/TodoListsProvider';
import Login from '../components/login/Login';
import Home from '../components/Home';

const Router = () => {
    return ( 
        <TodoListsProvider>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/home" element={<Home />} />
            </Routes>
        </TodoListsProvider>
     );
}
 
export default Router;