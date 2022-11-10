import React, {useEffect} from "react";
import './Login.css'
import {useState} from 'react'
import {useNavigate} from 'react-router-dom'

const Login=()=>{

    const[email, setEmail]=useState('')
    const[password, setPass]=useState('')
     const nav=useNavigate()


     useEffect(()=>{
        const data = localStorage.getItem('woner')
        if(data){
            nav('/')
        }
    }, []);

    const loginData=async()=>{
        let result= await fetch('http://localhost:5000/loginWoner', {
            method: 'post',
            body: JSON.stringify({ email, password}),
            headers:{
                'Content-Type':'application/json'
            }
        })
      
         result=await result.json()
         console.warn(result.woner._id)
      
    
        if(result.auth ){
            localStorage.setItem("id",(result.woner._id))
        localStorage.setItem("woner",JSON.stringify(result.woner.name))
        localStorage.setItem("email",JSON.stringify(result.woner.email))
        localStorage.setItem("token",JSON.stringify(result.auth))
        nav('/')
        }else{
            alert("Kindly insert correct input")
        }
    }

    return (
        <div className="login">
            <input className="inputBox" value={email} onChange={(e)=>setEmail(e.target.value)}  type='text' placeholder="Enter Email"/>
            <input className="inputBox" value={password} onChange={(e)=>setPass(e.target.value)} type='password' placeholder="Enter Password"/>
            <button onClick={loginData} className="btn" type="button">Login</button>
        </div>
    )
}

export default Login