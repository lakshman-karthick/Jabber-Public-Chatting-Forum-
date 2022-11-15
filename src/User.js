import React, { useEffect, useState } from 'react'
import './User.css'
import SearchIcon from '@mui/icons-material/Search';
import SidebarUser from './SidebarUser';
import db from './firebase';
// import {Link} from './react-router-dom'
function User() {

  const [rooms,setRooms] = useState([]);
  const [srooms,setSRooms] =useState('')
  const [sroom,setSRoom] =useState([])
  useEffect(()=>{
    const unsubscribe = db.collection('Rooms').onSnapshot(snapshot=>{
      setRooms(snapshot.docs.map(doc=>({
        id:doc.id,
        data:doc.data(),
      })
      ))
    })
    return()=>{
      unsubscribe();
    }
  },[])


  // const searchRooms=()=>{
  //   sroom.map(room1=>{
  //     if(room1.data.Name == srooms){
  //        setSRoom(room1.data())
  //     }
  //   }
  //   );
  // }

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
        <SidebarUser key={room.id} id={room.id} name={room.data.Name} image={room.data.Image}/>
      )) }
       
      </div>
    </div>
  )
}

export default User
