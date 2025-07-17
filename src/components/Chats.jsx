import React,{useContext, useEffect, useState} from 'react'
import Image from '../assets/imges.jpg'
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';

const Chats = () => {

    const [chats, setChats] = useState([]);
    const {currentUser} = useContext(AuthContext);
    const {dispatch} = useContext(ChatContext);
 
    // realtime snapshots
    useEffect(()=>{
       const getChats = () =>{
         const unsub = onSnapshot(doc(db, "userChats", currentUser.uid),
        (doc) => setChats(doc.data()));
        return ()=>{
            unsub();
        }
       }
       currentUser.uid && getChats()
    },[currentUser.uid])

    const handleSelect = (us) => {
            dispatch({type:"CHANGE_USER", paylaod:us})
    }
  return (
    <div className='chats'>
    {
        Object.entries(chats)?.sort((a,b)=> a[1].date - b[1].date).map(chat =>{
                <div className="userChat" key={chat[0]} onClick={handleSelect(chat[1].userInfo)}>
                <img src={chat[1].userInfo.photoURL} alt="" srcset="" />
                <div className="userChatInfo">
                    <span>{chat[1].userInfo.displayName}</span>
                    <p>{chat[1].lastMessage?.text}</p>
                </div>
            </div>
        })
    }
    </div>
  )
}

export default Chats