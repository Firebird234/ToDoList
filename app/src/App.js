import logo from './logo.svg';
import './App.css';
import { TaskForm } from './components/TaskForm/TaskForm';
import { TaskList } from './components/TaskList/TaskList';
import Loader from './components/Loader/Loader';
import { useSelector } from 'react-redux';

function App() {
  const loader = useSelector((state) => state.taskReducer.loader);
  return (
    <div className="App">
      {loader && <Loader/>}
      <h1 className='App__title'>TODO LIST</h1>
      <TaskForm/>
      <TaskList/>
    </div>
  );
}

export default App;
