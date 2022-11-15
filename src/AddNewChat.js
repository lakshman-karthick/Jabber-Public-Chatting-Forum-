import React,{useState} from 'react'
import db from './firebase';
import firebase from "firebase/compat/app"
import './AddNewChat.css'
function AddNewChat() {
    const [roomName,setRoomName] = useState('');
    const [imageUrl,setImageUrl] = useState('');
    const [creatorName,setCreatorName] = useState('');
    const [theme,setTheme] = useState('');
    const [CreatorEmail,setCreatorEmail] = useState('');

    const createChat =(e)=>{
        e.preventDefault();
        db.collection('Rooms').add({
          Name:roomName,
          Image :imageUrl,
          CreatorName: creatorName,
          Email: CreatorEmail,
          Theme: theme,
          Timestamp:firebase.firestore.FieldValue.serverTimestamp(),
        })
        setRoomName("")
        setImageUrl("")
        setCreatorName("")
        setTheme("")
        setCreatorEmail("")
      }

  return (
    <div className='AddNewChat'>
    <h2  className='AddFont'>ADD NEW CHAT</h2>
      <form className='newChat2'>
        <div><label>Chat Name:</label></div>
        <div><input type="text" value={roomName} required onChange={(e)=>setRoomName(e.target.value)}/></div>
        <div><label>Profile URL:</label></div>
        <div> <input type="text" value={imageUrl} required='True' onChange={(e)=>setImageUrl(e.target.value)}/></div>
        <div><label>Creator Name:</label></div>
        <div><input type="text" value={creatorName} required='True'  onChange={(e)=>setCreatorName(e.target.value)}/></div>
        <div><label>Creator Email:</label></div>
        <div> <input type="text" value={CreatorEmail} required='True'  onChange={(e)=>setCreatorEmail(e.target.value)}/></div>
        <div><label>Description:</label></div>
        <div> <textarea rows="4" cols="20" value={theme} required='True' onChange={(e)=>setTheme(e.target.value)}/></div>
        <div className='pad'>
        <button className='butt' onClick={createChat} type='submit'>CreateChat</button>
        </div>
       
      </form>
    </div>
  )
}

export default AddNewChat