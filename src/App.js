import { BrowserRouter } from 'react-router-dom';
import './App.css';
import TodoListsProvider from './provider/TodoListsProvider';
import Router from './route/Router';


function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <TodoListsProvider>
          <Router />
        </TodoListsProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
