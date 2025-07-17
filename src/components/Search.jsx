import React, { useContext, useState } from 'react'
import Image from '../assets/imges.jpg'
import { collection, getDocs,getDoc, query, where, setDoc, doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { AuthContext } from '../context/AuthContext';

const Search = () => {

  const [userName, setUserName] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);

  const { currentUser }  = useContext(AuthContext);


  const handleSearch = async () => {
    const qu = query(collection(db,"users"),where("displayName", "==", userName));
    try {
        const querySnapshot = await getDocs(qu);
        querySnapshot.forEach(doc =>{
          console.log("Doc Data: ", doc.data())
          setUser(doc.data());
        });
    } 
    catch (error) {
        setErr(true);
    }
  }
  const handleKey =(e) =>{
        e.code === 'Enter' && handleSearch()
  }

  const handleSelect = async ()=>{
      // check weather the group or chats in firestore exists, if not create one 
      const combinedId = currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid
 
     try {
      const res = await getDoc(doc(db, "chats", combinedId));
      if(!res.exists()){
        //create
        await setDoc(doc(db, "chats",combinedId) ,{messages:[]});

        // create user Chats 
        await updateDoc(doc(db,"userChats", currentUser.uid),{
          [combinedId+".userInfo"]:{
              uid: user.uid,
              displayName: user.displayName,
              photoURL:user.photoURL
          },
          [combinedId+".date"]: serverTimestamp()
        });
       
         await updateDoc(doc(db,"userChats", user.uid),{
          [combinedId+".userInfo"]:{
              uid: currentUser.uid,
              displayName: currentUser.displayName,
              photoURL:currentUser.photoURL
          },
          [combinedId+".date"]: serverTimestamp()
        });
       
      }
     } catch (error) {
        console.log(error)
     } 

      //create user chats
     setUser(null);
     setUserName("")

  }



  return (
    <div className='search'>
        <div className="searchForm">
              <input type="text" name="" id="" 
              placeholder='Search user'
               onKeyDown={handleKey} 
               onChange={(e)=>setUserName(e.target.value)}
               value={userName}
                 />
        </div>
        {/* {err && <span>User Not Found! </span>} */}
        <div className="userChat">
          <img src={user.photoURL}  />
          <div className="userChatInfo">
              <span>{user.displayName}</span>
              <p>the end</p>
          </div>

        </div>
      
    </div>
  )
}

export default Search