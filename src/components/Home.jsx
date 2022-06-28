import Nav from "./navigation/Nav";
import TodoListOverview from "./todolist/TodoListOverview";

const Home = () => {
    return ( 
        <div>
            <Nav />
            <TodoListOverview />
        </div>
    );
}
 
export default Home;