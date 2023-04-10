
import './App.css';
import { useState } from 'react';
import {BrowserRouter as Router,Switch ,Route, Routes} from 'react-router-dom';
import TaskBar from './TaskBar';
import User from './User';
import Forum from './Forum';
import New from './New'
import Home from './Home';
import Login from './Login';
import { useStateValue } from './StateProvider';
import Delete from './delete';
import ContactForm from './help';
function App() {
  const [{user},dispatch] = useStateValue();
  const [rooms,setRooms] = useState([]);
  return (
    <div className="App">
     {!user ?<Login/> :(
    <div className='app_body'>
        <Router>
        <TaskBar/>
        <User listRoom={{ rooms, setRooms }}/>
          <Routes>
            <Route path="/" element={<Home/>}> </Route>
            <Route path="/rooms/:id" element={<Forum/>}> </Route>
            <Route path="/rooms/:id/:id2" element={<Delete/>}> </Route>
            <Route path="/addChat" element={<New listRoom={{ rooms, setRooms }}/>}></Route>
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
