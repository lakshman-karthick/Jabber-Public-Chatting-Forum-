import React from 'react'
import { Link, useParams } from 'react-router-dom';
import './Delete1.css'
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import Axios from 'axios';
const APILINK = "http://localhost:8000/api/v1/jabber/chat/"
function Delete1() {
    const {id,id2} = useParams()
    const deleteMessage=(e)=>{
        e.preventDefault();
        Axios.delete(APILINK + id +"/messages"+"/"+id2).then((res,req)=>{
                 console.log(res.data);
        })
    }

  return (
    <div className='delete2'>
      <form className='newChat1'>
      <Link to={`/rooms/${id}`}>
      <ArrowBackIosNewOutlinedIcon className='back'/>
      </Link>
        
         <h1 className='delMess'>Are You Sure to Delete the Message?</h1>
         <div className='pad'>
         <button className='butt' type='submit' onClick={deleteMessage}>Yes</button>
         </div>
        
      </form>
    </div>
  )
}

export default Delete1
