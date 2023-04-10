import { Avatar } from '@material-ui/core'
import React from 'react'
import { IconButton } from '@material-ui/core'
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ChatIcon from '@mui/icons-material/Chat';
import Person2Icon from '@mui/icons-material/Person2';
import SettingsIcon from '@mui/icons-material/Settings';
import HelpIcon from '@mui/icons-material/Help';
import { Link } from 'react-router-dom';
import { useStateValue } from './StateProvider'
import './TaskBar.css'
function TaskBar() {
       const [{user},dispatch] = useStateValue();     
  return (
    <div className='Task'>
    <div className='taskbar_header'>
    <div className='taskbar_avatar'>
    <Avatar src={user?.photoURL}/>
    </div> 
      <div className='taskbar_headerRight'>
      <Link to={'/'}>
      <IconButton>
             <HomeRoundedIcon style={{color: "purple"}}/> 
      </IconButton> 
      </Link>
      <IconButton>
             <Person2Icon style={{color: "purple"}}/> 
      </IconButton> 
      
      <Link to={'/addChat'}>
      <IconButton>
             <ChatIcon style={{color: "purple"}}/> 
      </IconButton>  
      </Link>
      
      <IconButton>
             <SettingsIcon style={{color: "purple"}}/> 
      </IconButton> 
      <Link to={'/contact'}>
      <IconButton>
             <HelpIcon style={{color: "purple"}}/> 
      </IconButton>  
      </Link> 
      
      </div>
      </div>
    </div>
  )
}

export default TaskBar
