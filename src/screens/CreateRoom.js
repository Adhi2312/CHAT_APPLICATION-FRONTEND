import React, { useState } from 'react'
import { Navbar } from '../App'
import { Link, useNavigate } from 'react-router-dom'
import createImage from '../create2.webp';
import { useNavigation,useLocation } from 'react-router-dom';

import axios from 'axios';

export const CreateRoom = (id) => {
  const[image,setImage]=useState(createImage)
  const[roomName,setRoomName]=useState("")
  const[roomCode,setRoomCode]=useState('')   
  const nav=useNavigate() 
  const[roomCategory,setRoomCategory]=useState(true)
  const loc =useLocation();
  const {us_id,name}=loc.state || {}
  console.log("helloo",name)
  console.log("createRo"+us_id)
  const createRoom =async()=>
  {
   
    
    const res=await axios.post(`https://chatify-9x59.onrender.com/create/${name}`,{room_name:roomName,
    room_code:roomCode,
    group_chat:roomCategory,
    author:us_id})
    console.log(res.data.message)
    if(res.data.message=="Room created")
    {
      console.log("Room created successfully")
      nav(`/Room/${roomName}`,{state:{us_id:us_id,room_name:roomName}})
    }
    console.log('hai')


  }
  const handleFile=(event) => {
    const url=URL.createObjectURL(event.target.files[0])
    setImage(url)
  }
  return (
    <div style={{display:"flex",justifyContent:"center"}}>
      <img src='https://img.freepik.com/free-vector/chatbot-concept-background-with-mobile-device_23-2147833049.jpg?size=626&ext=jpg&ga=GA1.1.476401614.1722001983&semt=ais_user' width={440} height={580}/>
      
      <div className='create-form' >
          <img src={image}   height={100} width={100} style={{borderRadius:"50%"}}/>
          <input id='h1' style={{width:"100%"}} type="file" onChange={handleFile}/>
          <div >
          <p >Enter Room Name</p>
          <input onChange={(e)=>{setRoomName(e.target.value)}}/>
          </div>
          <div>
          <p>Enter Room Code</p>
          <input onChange={(e)=>{setRoomCode(e.target.value)}}/>
          </div>
          <div>
          <p>Choose Room Category</p>
          <div style={{width:"335px"}}>
          <input onClick={()=>{setRoomCategory(false)}}  type='radio' name="category" value="one-to-one" />
          <label style={{marginRight:"60px"}}>One-to-One</label>
          <input onClick={()=>{setRoomCategory(true)}} type='radio' name="category" value="Group Chat" />
          <label >Group Chat</label>
          
          <button onClick={()=>{createRoom()}} style={{marginTop:"40px"}}>Create</button>
          
          </div>
          </div>
          
      </div>
      
    </div>
    
  )
}
