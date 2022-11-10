import React from "react";
import './Update_student.css'
import {useState} from 'react'
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";



const Update_product=()=>{
  
    const [name, setName]= useState('')
    const [subject, setSubject]= useState('')
    const [marks, setMarks]= useState('')
    
    
    const params = useParams()
    const nav = useNavigate()

    useEffect(()=>{
        getStudent()
    },[])


      

    const getStudent=async()=>{
        let result= await fetch(`http://localhost:5000/getStudent/${params.id}`,{
            headers:{
                authorization: ` ${JSON.parse(localStorage.getItem('token'))}`
              }
        });
            result=await result.json()
            setName(result.name)
            setSubject(result.subject)
            setMarks(result.marks)
           
    }

     const updateStudent= async()=>{
        console.warn(name, subject);
        let result= await fetch(`http://localhost:5000/updateStudent/${params.id}`,{
        method:"Put",
        body:JSON.stringify({name, subject, marks}),
        headers:{
            'Content-Type':"application/json",
            authorization: ` ${JSON.parse(localStorage.getItem('token'))}`
        }
        });
        if(result){
                     alert("Successful")  
                     setName('') 
                     setSubject('') 
                     setMarks('')
                     nav('/')
                }
  
     }

    return (
        <div className="box" >
            <h1>Update Student</h1>

            <input type='text' placeholder="Enter product name" className="inputProduct"
           value={name} onChange={(e)=>{setName(e.target.value)}}
            />
           
            <input type='text' placeholder="Enter subject" className="inputProduct"
           value={subject} onChange={(e)=>{setSubject(e.target.value)}}
            />
            
            <input type='text' placeholder="Enter marks" className="inputProduct"
           value={marks} onChange={(e)=>{setMarks(e.target.value)}}
            />
            
           
            
            <button onClick={updateStudent} className="btn">Update</button>
        </div>
    )
}

export default Update_product