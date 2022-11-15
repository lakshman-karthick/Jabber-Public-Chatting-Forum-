import React, { useEffect, useRef, useState } from 'react'
import { useContext } from 'react';
import { Avatar } from '@material-ui/core'
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import PhotoSizeSelectActualIcon from '@mui/icons-material/PhotoSizeSelectActual';
import PhotoSizeSelectActualOutlinedIcon from '@mui/icons-material/PhotoSizeSelectActualOutlined';
import MicIcon from '@mui/icons-material/Mic';
import './Chat.css'
import { useParams } from 'react-router-dom';
import db from './firebase';
import firebase from "firebase/compat/app"
import ImgPopUp from './imgPopUp';
import {Link} from "react-router-dom";
import { useStateValue } from './StateProvider';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import Emoji from './emoji';

function Chat() {

  const [roomName,setRoomName] = useState('');
  const [imageUrl,setImageUrl] = useState('');
  const {id} = useParams();
  const [messages,setMessages] = useState([])
  const [input,setInput] = useState('');
  const [popUp,setPopUp] = useState(false);
  const [popUp2,setPopUp2] = useState(false);
  const [inputURL,setInputURL] = useState('')
  const [inputE,setInputE] = useState('')
  const [{user},dispatch] = useStateValue();
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
      .collection('Messages')
      .orderBy('Timestamp','asc')
      .onSnapshot(snapshot=>(
           setMessages(snapshot.docs.map((doc)=>({
            id:doc.id,
            data:doc.data(),
          })
          ))
      ));

      console.log(messages.id)

    }
  },[id]);

  const messageEl = useRef(null);

  useEffect(() => {
    messageEl.current?.scrollIntoView();
  }, [messages])

  

  const sendMessages =(e)=>{
    e.preventDefault();
    console.log(inputURL)
    db.collection('Rooms').doc(id).collection('Messages').add({
      Message:input,
      Name : user.displayName, 
      Image: inputURL,
      Timestamp:firebase.firestore.FieldValue.serverTimestamp(),
    })
    setInput("");
    setInputURL("");
  }



  return (
    
       <div className='chat'>
      <div className='chat_header'>
        <Avatar src={imageUrl}/>
        <div className='chat_headerInfo'>
             <h3>{roomName}</h3>
             <p>
             last seen{" "}
             {new Date(
              messages[messages.length-1]?.Timestamp?.toDate()).toUTCString()}
             </p>
        </div>
    </div>
    <div id='messageBody' className='chat_body'>
    {messages.map((messages)=>(
      <div>
      <p className={`chat_message ${messages.data.Name === user.displayName && "chat_receiver"}`}>
        <span className='chat_name'>{messages.data.Name}</span>
        {messages.data.Message}
        <div>
        {messages.data.Image &&  <img className='msgImage' src={messages.data.Image}></img>}
       
        </div>
        <span className='chat_timestamp'>
        {new Date(messages.data.Timestamp?.toDate()).toUTCString()}
        </span>
        <Link to={`/rooms/${id}/${messages.id}`}>
        <DeleteOutlineOutlinedIcon className='delete'/>
        </Link>
        
        </p>
       
      </div>
      
        
    ))}
        
    <div ref={messageEl}/>
        
    </div>
    <div className='chat_footer'>
    <Link onClick={()=>setPopUp2((popUp2)=>!popUp2)}>
    <InsertEmoticonIcon className='photo' style={{color: "gray"}}/>
    </Link>
    

      <form className='msg'>
        <input value={input} onChange={(e)=>setInput(e.target.value)}  placeholder='Type a message' type='text'/>
        <button onClick={sendMessages} type='submit'>Send a message</button>
      </form>
      <Link  onClick={()=>setPopUp((popUp)=>!popUp)}>
      <PhotoSizeSelectActualOutlinedIcon className='photo' style={{color: "gray"}}/>
      </Link>
      
    </div>
    {popUp2 && <Emoji setPopUp2={setPopUp2} input={input} setInput={setInput} />}
    {popUp && <ImgPopUp setPopUp={setPopUp} inputU={inputURL} setInputU={setInputURL}/>}
    </div>
    
    
  )
}

export default Chat



//var chatHistory = document.getElementById("messageBody");
//chatHistory.scrollTop = chatHistory.scrollHeight;