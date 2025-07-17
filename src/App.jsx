import React, {  useContext, useEffect } from 'react'
import Register from './pages/Register';
import "./style.scss";
import Login from './pages/Login';
import Home from './pages/Home';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from './firebase';

const App = () => {

  const  { currentUser } = useContext(AuthContext);
  
  useEffect(()=>{
      signOut(auth)
  },[])


  const ProtectedRoute = ({ children }) =>{
    if(!currentUser) {
          return <Navigate to="/login"  />
    }
    return children;
  }

  return (
    <>

    <BrowserRouter>
      <Routes>
      <Route path='/'>
          <Route index element={

            <ProtectedRoute>
                <Home />
            </ProtectedRoute>

            } />
          <Route path='/register' element={<Register />}   />
          <Route path='/login' element={<Login />}   />
      </Route>
          
      </Routes>
    </BrowserRouter>

      {/* <Register /> */}
      {/* <Login /> */}
      {/* <Home />  */}
    </>
  )
}

export default App