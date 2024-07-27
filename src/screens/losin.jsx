import React, { useState } from 'react'
import { IoLogoSnapchat } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
// import router from '../../../back/routes';


export const Login = ({setUsername,setSub,setId}) => {
     
    
    const nav=useNavigate();
    const hand_login=async()=>{
        

            const res=await axios.post("https://chatify-9x59.onrender.com/login",{username:document.getElementById("1").value,password:document.getElementById("2").value})
            
            
            if(res.data.message=="user found")
                {
                     console.log("hai")
                     const userId = res.data.user._id;
                 
                        setUsername(res.data.user.username)
                        setSub(res.data.secret)
                        setId(userId)

                    nav(`/Home/${res.data.user.username}`,{state:{us_id:userId}})
                }
                else {
                    console.log("hhhhhhh")
                    document.getElementById("info").textContent=res.data.message
                    
                }
                
            
        }       
  return (
    
    <div style={{display:"flex",justifyContent:"center"}}>
        <div className='login'>
            <div style={{textAlign:"center",marginBottom:"27px"}}>
            <IoLogoSnapchat size={40} style={{marginBottom:"0px"}}/>
                <h3 id='info'> Welcome back!</h3>
            </div>
            <p>Username</p>
            <input id='1'/>
            <p>
            Password
            </p>
            <input id='2'/>
            <br/>
            {/* <Link to="/Home" > */}.{}
            {/* <button className='login-button' >Login</button> */}
            <button className='login-button' onClick={hand_login}>sign</button>
            {/* </Link> */}
            <p>Don't have an account?<a href='/signup'>  Sign in</a></p>

        </div>

    </div>

  )
}
export const Signup = ({setUsername,setSub,setId}) => {
    const nav=useNavigate();
    
    const[user, setUser] =useState();
    const[info,setInfo]=useState("                    ");
    const[password, setPassword] =useState();
    const[cpass,setcpass]=useState();
    const [email,setEmail]=useState();
    const onSignup = async() => {
        if(cpass===password)
        {
            const res=await axios.post("https://chatify-9x59.onrender.com/signup",{username:user,password:password,email:email,});
            if(res.data.message=="success")
            {
                const userId=res.data.user.username;
                setUsername(res.data.user.username)
                        setSub(res.data.secret)
                        setId(res.data.user._id)

                        nav(`/Home/${res.data.user.username}`,{state:{us_id:res.data.user._id}})
            }
            else{
                document.getElementById('in').textContent="username already exists"
            }
            
        }
        else
        {
            document.getElementById('in').textContent="Password doesnt match"
        }

        
            
    }

    return(
        <div style={{display:"flex",justifyContent:"center"}}>
        <div className='login'>
            <div style={{textAlign:"center",marginBottom:"27px"}}>
                <h2 
                >Sign Up</h2>
            </div>
            <p>{info}</p>
            
            <p id='in'>Enter Username<span> *</span> </p>
            <input onChange={(e)=>{setUser(e.target.value)}} />
            <p>Enter Email adress</p>
            <input onChange={(e)=>{setEmail(e.target.value)}}/>
            <p>
                
            Enter Password<span> *</span>
            </p>
            <input  onChange={(e)=>{setPassword(e.target.value)}}/>
            <p>
                
                Confirm Password<span> *</span>
                </p>
                <input onChange={(e)=>{setcpass(e.target.value)}} />
            <br/>
            {/* <Link to="/Home" > */}.{}
            {/* <button className='login-button' >Login</button> */}
            <button className='login-button' onClick={onSignup}>sign</button>
            {/* </Link> */}
            <p> Existing User?<a href='/'>  login</a></p>

        </div>

    </div>
   
    )
}

