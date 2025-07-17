import React, { useContext } from 'react'
import Image from '../assets/imges.jpg'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {

  const { currentUser }  =useContext(AuthContext);

  const navigate = useNavigate()
  return (
    <div className='navbar'>

      <span className='logo'>Chat App</span>

      <div className="user">
          <img src={currentUser.photoURL}  />
          <span>{currentUser.displayName}</span>
          <button type="button" onClick={()=>(signOut(auth), navigate('/login'))}>Logout</button>
      </div>

    </div>
  )
}

export default Navbar