import React,{useState,useEffect} from 'react';
import './SidebarUser.css'
import db from './firebase';
import {Link} from "react-router-dom";
import { Avatar } from '@material-ui/core'
function SidebarUser({id,name,image}) {

  const [messages,setMessages] = useState("");
    useEffect(()=>{
      if(id){
        db
        .collection('Rooms')
        .doc(id)
        .collection('Messages')
        .orderBy('Timestamp','desc')
        .onSnapshot((snapshot)=>setMessages(snapshot.docs.map((doc)=>doc.data())));
      }
    },[id])

  return (
    <Link to={`/rooms/${id}`}>
      <div className='sidebarChat'>
      <Avatar src={image}/>
      <div className='sidebarChat_info'>
      <h3>{name}</h3>
      <p>{messages[0]?.Message}</p>
      </div>
    </div>
    </Link>
    
  )
}

export default SidebarUser
