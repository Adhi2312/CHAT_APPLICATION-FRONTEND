import logo from './logo.svg';
import { CiLogout } from "react-icons/ci";
import {BrowserRouter as Router,Routes,Route,Link,useLocation, useParams, useNavigate} from "react-router-dom";
import './App.css';
import {JoinRoom} from './screens/JoinRoom.js';
import  {CreateRoom}  from './screens/CreateRoom.js';
import {Room} from './screens/Room.js';
import { LuBox,LuHome,LuPhone } from "react-icons/lu";
import { Login,Signup } from './screens/losin.jsx';
// import crypto from 'crypto'
import { useState } from 'react';
// const crypto = require('crypto');
import SuprSendInbox from '@suprsend/react-inbox';
import 'react-toastify/dist/ReactToastify.css';

// import { useParams } from 'react-router-dom';

// import images from './images.png;
function App() {
  const loc=useLocation();
  console.log(loc.pathname=="/");
   const [id,setId]=useState();
   const [username,setUsername] = useState();
   const [sub,setSub] = useState("hello");
  return (
    <div style={{padding:"50px"}}>
      <div className={!(loc.pathname=='/' || loc.pathname=='/signup')?'nav1':'nav2'} >

      <Navbar username={username} sub={sub} id={id} />
      </div>
      <div style={{marginTop:"120px"}}>
      <Routes>
        <Route path='/' element={<Login setUsername={setUsername} setSub={setSub} setId={setId}/>}/>
        <Route path="/Home/:id" element={<Home/>}/>
        <Route path="/join" element={<JoinRoom id={id}/>}/>
        <Route path='/Room/:r_id' element={<Room id={id}/>}/>
        <Route path="/create" element={<CreateRoom id={id}/>}/>
        <Route path="/room"  element={<Room id={id}/>}/>
        <Route path='/signup' element={<Signup setUsername={setUsername} setSub={setSub} setId={setId} />}/>

      </Routes>
      </div>
    </div>
  );
}

export const Home=()=>{
  console.log("Home");
  const loc=useLocation()
  const {us_id}=loc.state || {};

  const {id}=useParams()
  
  console.log("Home"+us_id);
  const nav=useNavigate();
  
 return(
  
  <div >
    
    {/* <JoinRoom/> */}
    <div >
    
    <div style={{display:"flex",marginTop:"200px"} }>
      <div className='home-c'>
      <img src={require("./image2.jpeg")}/>
      
      <button onClick={()=>{nav('/join',{state:{us_id:us_id}})}} >Join Room</button>
      
      </div>
      <div>
        <img src={require("./joinlast.avif")} style={{height:"400px"}}/>
      </div>
    </div>
    <div style={{display:"flex",marginTop:"90px" }}>
      <div >
        <img src={require("./c.jpg")} style={{height:"400px",width:"700px"}}/>
      </div>
      <div className='home-c' style={{marginLeft:"100px"}}>
      <img src={require("./images.png")}/>
      
      <button onClick={()=>{nav('/create',{state:{us_id:us_id,name:id}})}}>Create Room</button>
      
      </div>
    </div>
    </div>
  
  </div>
 )
}

export const Navbar=({username,sub,id})=>{
  console.log(username,sub);
  console.log(id)
  const nav=useNavigate()
//   const hash = crypto
//   .createHmac("sha256", "ei5GyOozePpwdJuz0pJmH7wS2rzZT2y4kiLrmYsF1SY")
//   .update(username)
//   .digest("base64url");
// const sec=hash.trimEnd("=");
  // console.log(sec)
return(
  <div className='NavBar'>
    <div style={{width:"700%",justifyContent:"center" ,color:"wheat",marginLeft:"-60px"}}><h3 style={{textAlign:"center",marginLeft:"100px"}}>CHATIFY</h3></div>
    <div className='sub-nav'>
      
    <LuHome onClick={()=>{nav(`/Home/${username}`,{state:{us_id:id}})} }   size={35} style={{marginTop:"10px",marginRight:"75px"}} color='white'/>
    
    <Link to="/">
      <LuBox size={35} style={{marginTop:"10px",marginRight:"75px"}} color='white'/>
      </Link>
      <div style={{margin:"15px",marginRight:"50px",marginTop:"3px"}}>
      <SuprSendInbox 
      // theme={{ header: { container: { backgroundColor: 'grey' }}}}
      theme={{ bell: { color: 'white' } }}
        workspaceKey="CRTnWIfCxuVZRj6rHVa6"
        subscriberId={sub}
        distinctId= {username}// Using userId as subscriberId
        
        
      />
      </div>
      <img style={{marginTop:"3px"}} src='https://i.pinimg.com/736x/0d/64/98/0d64989794b1a4c9d89bff571d3d5842.jpg'/>
      <CiLogout onClick={()=>{nav('/')}}  color='white' size={35} style={{marginRight:"7px",marginTop:"9px"}}/>
    </div>
    
      
  </div>
)
}


export default App;
