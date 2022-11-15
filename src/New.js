import React from 'react'
import Chat from './Chat'
import Profile from './Profile'
import './New.css'
import AddNewChat from './AddNewChat'
import Logo from './Components/logo'
function Forum() {
  return (
    <div className='new'>
      <AddNewChat/>
      <Logo/>
    </div>
  )
}

export default Forum
