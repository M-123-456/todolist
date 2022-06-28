import Nav from "./navigation/Nav";
import TodoLists from "./todolist/TodoLists";

const Home = () => {
    return ( 
        <div>
            <Nav />
            <TodoLists />
        </div>
    );
}
 
export default Home;