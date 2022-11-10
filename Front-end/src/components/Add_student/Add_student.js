import React from "react";
import './Add_student.css'
import {useState} from 'react'


const Add_product=()=>{
  
    const [name, setName]= useState('')
    const [subject, setSubject]= useState('')
    const [marks, setMarks]= useState('')
    const [error, setError]= useState(false)

    const addProduct= async()=>{
        console.warn(name, subject, marks)

        if(!name || !subject || !marks){
            setError(true)
            return false
        }

        const userId =localStorage.getItem('id')
        
        let result= await fetch('http://localhost:5000/addStudent', {
            method: 'post',
            body: JSON.stringify({name, subject, marks, userId}),
            headers:{
                'Content-Type':'application/json',
                authorization: ` ${JSON.parse(localStorage.getItem('token'))}`
            }

        })
       

        if(result){
             alert("Successful")  
             setName('')
             setSubject('') 
             setMarks('')
        }
    }

    return (
        <div className="box" >
            <h1>Add Student</h1>

            <input type='text' placeholder="Enter student name" className="inputProduct"
           value={name} onChange={(e)=>{setName(e.target.value)}}
            />
           {error && !name && <span className="invalid-input">Enter valid name</span>}
            <input type='text' placeholder="Enter subject" className="inputProduct"
           value={subject} onChange={(e)=>{setSubject(e.target.value)}}
            />
             {error && !subject && <span className="invalid-input">Enter subject</span>}
            <input type='text' placeholder="Enter marks" className="inputProduct"
           value={marks} onChange={(e)=>{setMarks(e.target.value)}}
            />
             {error && !marks && <span className="invalid-input">Enter marks</span>}
            <button onClick={addProduct} className="btn">Add product</button>
        </div>
    )
}

export default Add_product