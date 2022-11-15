import React from 'react'
import Chat from './Chat'
import Profile from './Profile'
import './Forum.css'
function Forum() {
  return (
    <div className='forum'>
      <Chat/>
      <Profile/>
    </div>
  )
}

export default Forum
