import React, { useEffect, useState } from 'react'
import './User.css'
import SearchIcon from '@mui/icons-material/Search';
import SidebarUser from './SidebarUser';
import Axios from 'axios';
const APILINK = "http://localhost:8000/api/v1/jabber/chat"
// import {Link} from './react-router-dom'
function User(props) {

  const {rooms,setRooms} = props.listRoom;
  const [srooms,setSRooms] =useState('')
  const [sroom,setSRoom] =useState([])
  useEffect(()=>{
    Axios.get("http://localhost:8000/api/v1/jabber/chat").then(res=>{
      console.log(res.data)
      setRooms(res.data)
    })
    .catch(err=>{
      console.log(err)
      console.log("error");
    })
  },[])


  return (
    <div className='user'>
    <div className='sidebar_search'>
        <div className='sidebar_searchContainer'>
        {/* <Link onClick='searchRooms'> */}
        <SearchIcon/>
        {/* </Link> */}
            
             <input value={srooms} onChange={(e)=>setSRooms(e.target.value)}  className='Search' placeholder='Search or start new chat' type='text'/>
        </div>
      </div>
      <div className='sidebar_chats'>
     
      {rooms.map(room=>(
        <SidebarUser key={room._id} id={room._id} name={room.roomName} image={room.profileImage}/>
      )) }
       
      </div>
    </div>
  )
}

export default User
