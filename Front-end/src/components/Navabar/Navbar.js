import React from 'react';
import './Navbar.css'
import {Link, useNavigate} from 'react-router-dom'
import imageLogo from '../../images/icon.png'
const Nav=()=>{
    const data = localStorage.getItem('woner')
    const navigate = useNavigate()

    const logout=()=>{
        localStorage.clear()
        navigate('/signup')
    }
    return (
        
        
        
        <div>
           <img className='logoStyle' src={imageLogo} alt='Display is missing'/>
           <p className='titleStyle'>Rocord_Book</p>
     {
        data ? <ul className='nav-ul'>
            <li><Link to='/'>Student</Link></li>
            <li><Link to='/add'>Add Student</Link></li>
            <li><Link to='/profile'>Profile</Link></li>
            <li> <Link onClick={logout} to='/signup'>Logout ( {JSON.parse(data)} )</Link> </li>
            
        </ul>
        :
        <ul className='nav-ul nav-right'>
            <li><Link to='/signup'>Signup</Link></li>
            <li><Link to='/login'>Login</Link></li>
        </ul>
      }
       </div>
       
    )
}

export default Nav