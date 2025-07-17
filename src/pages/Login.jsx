import React, { useContext, useState } from 'react'
import {signInWithEmailAndPassword} from "firebase/auth"
import { auth } from '../firebase'
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';


const Login = () => {
    const [err ,setErr] = useState(false);
    const navigate = useNavigate();
    const {setCurrentUser} = useContext(AuthContext);


 const handleSubmit = async (event)=>{
        event.preventDefault()

        const email = event.target[0].value;
        const password = event.target[1].value;

      try {
       await signInWithEmailAndPassword(auth, email, password)
        .then((credentials)=>{
            console.log(credentials)
                if(credentials){

                    setCurrentUser(credentials)
                    navigate('/')
                }
        })
        .catch(()=>{
            const errorCode = error.code;
            const errorMessage = error.message;
        })
       
      } 
      catch (error) {
        setErr(true);
      }
      
            
  }



  return (
      <div className='formContainer'>
          <div className="formWrapper">
              <span className="logo">Chat App</span>
              <span className="title">Login</span>
              <form onSubmit={handleSubmit}>
                  <input type="email" placeholder='email'/>
                  <input type="password" placeholder='password'/>
                  <button  type="submit">Sign In</button>
                  {
                    err && <span>Something went wrong... </span>
                  }
              </form>
              <p>You don't have an account? <Link to='/register'>Register</Link></p>
          </div>
      </div>
    )
}

export default Login