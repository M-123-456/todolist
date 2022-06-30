
import './App.css';
import Home from './components/Home';
import TodoListsProvider from './provider/TodoListsProvider';


function App() {

  return (
    <div className="App">
        <TodoListsProvider>

          <Home />

        </TodoListsProvider>
    </div>
  );
}

export default App;
