import React, {useEffect} from "react";
import './Signup.css'
import {useState} from 'react'
import {useNavigate} from 'react-router-dom'


function Signup(){
    const[name, setName]=useState('')
    const[email, setEmail]=useState('')
    const[password, setPass]=useState('')
    const navigate=useNavigate()

    useEffect(()=>{
        const data = localStorage.getItem('woner')
        if(data){
            navigate('/')
        }
    },[])


    const getData=async()=>{
        let result= await fetch('http://localhost:5000/register', {
            method: 'post',
            body: JSON.stringify({name, email, password}),
            headers:{
                'Content-Type':'application/json'
            }
        })
         result=await result.json()
         console.warn(result)

       if(result.status!== false){
           localStorage.setItem("id",(result.woner._id))
        localStorage.setItem("woner",JSON.stringify( result.woner.name))
        localStorage.setItem("email",JSON.stringify( result.woner.email))
        localStorage.setItem("token",JSON.stringify( result.auth))
        navigate('/')
       }else{
        alert(result.msg)
       }
    }
    return (
     
        <div className="box">
            <input className="inputBox" type='text' value={name} onChange={(e)=>setName(e.target.value)} placeholder="Enter Name"/>
            <input className="inputBox" value={email} onChange={(e)=>setEmail(e.target.value)} type='text' placeholder="Enter Email"/>
            <input className="inputBox" value={password} onChange={(e)=>setPass(e.target.value)} type='password' placeholder="Enter Password"/>
            <button onClick={getData} className="btn" type="button">Sign Up</button>
        </div>
      
    )
}

export default Signup