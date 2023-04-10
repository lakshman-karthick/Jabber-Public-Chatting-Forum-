import React from 'react'
import Chat from './Chat'
import Profile from './Profile'
import './New.css'
import AddNewChat from './AddNewChat'
import Logo from './Components/logo'
function Forum(props) {
  const {rooms,setRooms} = props.listRoom;
  return (
    <div className='new'>
      <AddNewChat listRoom1={{ rooms, setRooms }}/>
      <Logo/>
    </div>
  )
}

export default Forum
