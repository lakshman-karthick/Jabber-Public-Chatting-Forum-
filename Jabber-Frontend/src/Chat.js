import React, { useEffect, useRef, useState } from 'react'
import { useContext } from 'react';
import { Avatar } from '@material-ui/core'
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import PhotoSizeSelectActualIcon from '@mui/icons-material/PhotoSizeSelectActual';
import PhotoSizeSelectActualOutlinedIcon from '@mui/icons-material/PhotoSizeSelectActualOutlined';
import MicIcon from '@mui/icons-material/Mic';
import './Chat.css'
import { useParams } from 'react-router-dom';
import ImgPopUp from './imgPopUp';
import {Link} from "react-router-dom";
import { useStateValue } from './StateProvider';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditIcon from '@mui/icons-material/Edit';
import Emoji from './emoji';
import Axios from 'axios';

const APILINK = "http://localhost:8000/api/v1/jabber/chat/"

function Chat() {

  const [roomInfo,setRoomInfo] = useState([]);
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
      Axios.get(APILINK +id).then(res=>{
        setRoomInfo(res.data);
      }).catch(err=>{
        console.log(err)
        console.log("error");
      })

      Axios.get(APILINK+id+"/messages").then(res=>{
        setMessages(res.data);
      }).catch(err=>{
        console.log(err)
        console.log("error");
      })
    }
  },[id]);

  const messageEl = useRef(null);

  useEffect(() => {
    messageEl.current?.scrollIntoView();
  }, [messages])

  

  const sendMessages =(e)=>{
    e.preventDefault();
    console.log(inputURL)
    Axios.post(APILINK + id + "/messages",{
      message : input,
      imgUrl : inputURL,
      userName : user.displayName,
      id : id,
      timestamp: new Date().toLocaleString()
    }).then((res)=>{
      console.log(res.data);
      const newChatMsg = {
        id: res.data.msgpostResponse.insertedId,
        message : input,
        imgUrl : inputURL,
        userName : user.displayName,
        id : id,
        timestamp: new Date().toLocaleString()
      }
      setMessages([...messages,newChatMsg])
    })
    .catch(function (error) {
      console.log(error);
    });
    setInput("");
    setInputURL("");
  }



  return (
    
       <div className='chat'>
       {
        roomInfo.map(room=>(
          <div className='chat_header'>
            <Avatar src={room.profileImage}/>
            <div className='chat_headerInfo'>
                <h3>{room.roomName}</h3>
                <p>
                last seen{" "}
                {
                  messages[messages.length-1]?.timestamp
                }
                </p>
            </div>
          </div>
        ))
       }
      
    <div id='messageBody' className='chat_body'>
    {messages.map((message)=>(
      <div>
      <p className={`chat_message ${message.userName === user.displayName && "chat_receiver"}`}>
        <span className='chat_name'>{message.userName}</span>
        {message.message}
        <div>
        {message.imgUrl &&  <img className='msgImage' src={message.imgUrl}></img>}
       
        </div>
        <div className='position'>
          <span className='chat_timestamp'>
          {message.timestamp}
          </span>
          <div className='delete'>
            <Link to={`/rooms/${id}/${message._id}`}>
                <DeleteOutlineOutlinedIcon className='delete'/>
            </Link>
          </div>
        </div>
       
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