import React, { useState } from 'react'
import { Navbar } from '../App'
import { Link, useLocation } from 'react-router-dom'
import { useNavigate} from 'react-router-dom'
import axios from 'axios'


export const JoinRoom = ({id}) => {
  const loc =useLocation();
  const {us_id}=loc.state || {}
  console.log("hello guys"+us_id)
  const [users,setUsers]=useState();
  const [r_id,setR_id]=useState();
  const [r_name,setR_name]=useState();
    const nav=useNavigate();
    console.log("mudiyala",us_id)
  const handleJoin=async()=>{
    
    
   
    const res= await axios.post('https://chatify-9x59.onrender.com/getRoom',{room_name:r_name,room_code:r_id,user_id:us_id})
    console.log(res.data.message);
    if (res.data.message==="room found")

    {
      
      
      nav(`/Room/${r_name}`,{state:{us_id:us_id,room_name:r_name}})
    }
    else
  {
   document.getElementById('info').textContent=res.data.message 
  }
    

  }
  
  return (
<div style={{display:"flex"}}>
<div style={{width:"60%"}}>
    <img src={require("../join-form.avif")} width={800}/>
  </div>
  
    <div className='join-form'>
      <h2 id='info'>Join The Room To  Chat</h2>
      <p>Enter Room Name</p>
      <input onChange={(e)=>{setR_name(e.target.value)}} id='room_n'/>
      <p>Enter Room Code</p>
      <input onChange={(e)=>{setR_id(e.target.value)}} id='room_i'/>
      {/* <Link to="/room"> */}
      <button onClick={()=>{handleJoin()}}>Join</button>
      {/* </Link> */}
    </div>
    
    </div>
  )
}
