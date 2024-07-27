import React, { useEffect, useState } from 'react'
import { Navbar } from '../App'
import { IoSend } from "react-icons/io5";
import { GrAttachment } from "react-icons/gr";
import { HiDotsVertical } from "react-icons/hi";
import axios from 'axios';
import image from '../chih.png';


import { useLocation, useParams } from 'react-router-dom';
export const Room = ({id}) => {
  const [messages,setMessages]=useState([])
  const loc =useLocation();
  const {us_id,room_name}=loc.state || {}
  console.log("pls"+room_name)
  
  const [mess,setMess]=useState()
  
  console.log("hhhhhhh")
  const Messages=async(setMessages)=>{

   
    const res=await fetch(`https://chatify-9x59.onrender.com/getMessages/${room_name}`)
    console.log(res.data)
    const jsonData = await res.json();
    console.log(jsonData)
    setMessages(jsonData)
    
    console.log("message"+messages.auth)
  }
  
const messHandler = async()=>{
  console.log("enna idhu");
  try{const res=await axios.post(`https://chatify-9x59.onrender.com/postMessage`,{
    mess:mess,
    room:room_name,
    author:us_id

}

)
// setMess("")
}catch(err){console.log(err)}
  


}

useEffect(() => {
  Messages(setMessages);

  const interval = setInterval(() => {
    Messages(setMessages);
  }, 500); // Fetch messages every 5 seconds

  return () => clearInterval(interval); // Cleanup interval on component unmount
}, []);
// console.log(messages[0])
  // console.log(document.getElementById('h'))
  return (
    <div className='room-form'>  
    
    <div className='room-members'>
      
      
    <div style={{margin:"10px"}}>
      <img style={{height:"550px",width:"100%"}} src='https://img.freepik.com/free-vector/conversation-concept-illustration_114360-1305.jpg?w=740&t=st=1722002000~exp=1722002600~hmac=59ceb3c32104757b6ef6a382ff4511f01bc2b74515c2d62c13d1ed5a1cb43bec'/>
      
      </div>

    </div>
    <div className='chat'>
      <div className='info'>
        <div style={{width:"20%"}}>
        <img id='h' src={image} style={{height:"50px",width:"50px",marginTop:"10px",marginLeft:"30px",borderRadius:"50px"}}/>
        </div>
        <p style={{width:"100%",marginTop:"20px"}}>
          Funny Room

        </p>
        <HiDotsVertical size={22} style={{width:"20%",marginTop:"20px"}}/>

      </div>
      <div className='chats'>
        {messages.map((messages)=>(<div className='chat1'>
            <img src='https://i.pinimg.com/736x/0d/64/98/0d64989794b1a4c9d89bff571d3d5842.jpg' height={50} width={50} borderRadius={50}/>
            <div className='in-chat'>
              <p style={{fontSize:"10px",margin:"0px"}}>
                ~ {messages.author.username}
              </p>
              <p style={{margin:"0px"}}>
               {messages.mess}
              </p>
            </div>
        </div>))}
       
        

      </div>
      <div className='mess'>
      <GrAttachment size={25} style={{width:"12%",marginTop:"20px"}} />
      <div style={{width:"76%"}}>
        <input value={mess} 
          id='mes' onChange={(e)=>{setMess(e.target.value)}} style={{marginTop:"17px",fontSize:"20px",border:"0px",borderColor:"wheat",outline:"none",width:"100%"}} placeholder='Type a message'/>
      </div>
      <IoSend onClick={()=>{messHandler();setMess("")}}   size={25} style={{width:"12%",marginTop:"20px"}}/>

      </div>

    </div>
    </div>
  )
}
