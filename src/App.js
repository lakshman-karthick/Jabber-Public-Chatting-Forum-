
import './App.css';
import {BrowserRouter as Router,Switch ,Route, Routes} from 'react-router-dom';
import TaskBar from './TaskBar';
import User from './User';
import Forum from './Forum';
import New from './New'
import Home from './Home';
import Login from './Login';
import { useStateValue } from './StateProvider';
import Delete from './delete';
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import ContactForm from './help';
function App() {
  const [{user},dispatch] = useStateValue();
  return (
    <div className="App">
     {!user ?<Login/> :(
    <div className='app_body'>
        <Router>
        <TaskBar/>
        <User/>
          <Routes>
            <Route path="/" element={<Home/>}> </Route>
            <Route path="/rooms/:id" element={<Forum/>}> </Route>
            <Route path="/rooms/:id/:id2" element={<Delete/>}> </Route>
            <Route path="/addChat" element={<New/>}></Route>
            <Route path="/home" element={<Home/>}></Route>
            <Route path="/contact" element={<ContactForm/>}></Route>
          </Routes>
        </Router>
    </div>
    )} 
    </div>
  );
}

export default App;
