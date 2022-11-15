import { Room } from '@material-ui/icons'
import React,{useEffect,useState} from 'react'
import { useParams } from 'react-router-dom';
import db from './firebase'
import firebase from "firebase/compat/app"
import { Avatar } from '@material-ui/core'
import './Profile.css'
function Profile() {
  const {id,id2} = useParams();
  const [roomName,setRoomName] = useState('');
  const [imageUrl,setImageUrl] = useState('');
  const [creatorName,setCreatorName] = useState('');
  const [theme,setTheme] = useState('');
  const [timeStamp,setTimeStamp] = useState('');
 
  useEffect(()=>{
    if(id){
      db
      .collection('Rooms')
      .doc(id)
      .onSnapshot(snapshot=>(
        setRoomName(snapshot.data().Name)
      ));
      db
      .collection('Rooms')
      .doc(id)
      .onSnapshot(snapshot=>(
          setImageUrl(snapshot.data().Image)
      ));
      db
      .collection('Rooms')
      .doc(id)
      .onSnapshot(snapshot=>(
        setCreatorName(snapshot.data().CreatorName)
      ));
      db
      .collection('Rooms')
      .doc(id)
      .onSnapshot(snapshot=>(
        setTheme(snapshot.data().Theme)
      ));
      // db
      // .collection('Rooms')
      // .doc(id)
      // .onSnapshot(snapshot=>(
      //   setTimeStamp(snapshot.data().TimeStamp)
      // ));
      
      
    }
  },[id]);
  return (
    <div className='profile'>
      <img className='image' src={imageUrl}/>
      <h1 className='roomN'>{roomName}</h1>
      <form className='forms'>
        <h4>Creator Name:</h4>
        <p>{creatorName}</p>
        <h4>Description:</h4>
        
        <p className='scroll'>{theme}</p>
      </form>
    </div>
  )
}

export default Profile
