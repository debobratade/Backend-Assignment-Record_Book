
import React from 'react'
import { useNavigate } from 'react-router-dom'
import imageLogo from '../../images/logo.jpg'
import './profile.css'


const Profile = () => {
  let navigate = useNavigate()

  const logout=()=>{
    localStorage.clear()
    navigate('/signup')
}

    let name = localStorage.getItem('woner')
    let em = localStorage.getItem('email')
    name = JSON.parse(name)
    em = JSON.parse(em)
    
  return (
    <div className='profile'>
      <img src={imageLogo} alt={name}/>
          <h3>{name}</h3>
          <article>  {em}</article>
            <button onClick={logout} className='butn'>Logout</button>
      
    </div>
  )
}

export default Profile
