import { Room } from '@material-ui/icons'
import React,{useEffect,useState} from 'react'
import { useParams } from 'react-router-dom';
//import db from './firebase'
import firebase from "firebase/compat/app"
import { Avatar } from '@material-ui/core'
import './Profile.css'
import Axios from 'axios';
const APILINK = "http://localhost:8000/api/v1/jabber/chat/"
function Profile() {
  const {id} = useParams();
  const [roomInfo,setRoomInfo] = useState([]);
 
  useEffect(()=>{
    if(id){
        Axios.get(APILINK + id).then((res)=>{
          setRoomInfo(res.data);
          console.log(res.data);
        }).catch(err=>{
          console.log(err)
          console.log("error");
        })
      
    }
  },[id]);
  return (
    <div>
    {
      roomInfo.map(room=>(
        <div className='profile'>
        <img className='image' src={room.profileImage}/>
        <h1 className='roomN'>{room.roomName}</h1>
        <form className='forms'>
        <h4>Creator Name:</h4>
        <p>{room.creatorName}</p>
        <h4>Description:</h4>
        <p className='scroll'>{room.theme}</p>
        </form>
        </div>
      ))
      
    }
      
    </div>
  
  )
}

export default Profile
