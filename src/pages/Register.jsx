import React, { useState } from 'react'
import Add from '../assets/addAvatar.png'
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage , db }from '../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore"; 
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {

  const [err, setErr] = useState(false);
  const navigate = useNavigate()

  const handleSubmit = async (event)=>{
        event.preventDefault()

        const displayName = event.target[0].value;
        const email = event.target[1].value;
        const password = event.target[2].value;
        const file = event.target[3].files[0];

      try {
       const response = await createUserWithEmailAndPassword(auth, email, password); 
        const storageRef = ref(storage, displayName);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on('state_changed', 
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
              case 'paused':
                console.log('Upload is paused');
                break;
              case 'running':
                console.log('Upload is running');
                break;
            }
          }, 
          (error) => {
              setErr(true);
          }, 
          ()  => {
          
             getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
              await updateProfile(response.user,{
                    displayName: displayName,
                    photoURL: downloadURL
              });
                console.log( "uid:", response.user.uid,
                              "displayName:", displayName,
                              "email:", response.user.email,
                              "photoURL:",downloadURL)

              
                  await setDoc(doc(db, "users", response.user.uid),{
                                  uid: response.user.uid,
                                  displayName: displayName,
                                  email: response.user.email,
                                  photoURL:downloadURL
                      });
                  await setDoc(doc(db, "userChats", response.user.uid),{});
                      navigate('/')
            });
          }
        );
       
      } catch (error) {
        setErr(true);
      }
      
            
  }

  return (
    <div className='formContainer'>
        <div className="formWrapper">
            <span className="logo">Chat App</span>
            <span className="title">Register</span>
            <form onSubmit={handleSubmit}>
                <input type="text"  placeholder='Display Name'/>
                <input type="email" placeholder='email'/>
                <input type="password" placeholder='password'/>
                <label htmlFor="file">
                        <img src={Add}  />
                        <span>Add an avatar</span>
                </label>
                <input style={{display:"none"}} type="file" id='file' />
                <button  type="submit">Sign Up</button>
                {
                  err && <span>Something went wrong...</span> 
                }
            </form>
            <p>You do have an account? <Link to="/login">Register</Link></p>
        </div>
    </div>
  )
}

export default Register