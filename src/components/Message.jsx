import React, { useCallback, useContext, useEffect, useRef } from 'react'
import Image from '../assets/imges.jpg'
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext';

const Message = ({message}) => {

  const  { currentUser } =useContext(AuthContext);
  const { data } = useContext(ChatContext);
  const ref = useRef();

  useEffect(()=>{
    ref.current?.scrollIntoView({behavior:"smooth"})
  },[message])

  console.log(message)
  return (
    <div ref={ref}
    className = {`messsage ${ message.senderId === currentUser.uid && "owner" }`}>
        <div className="messageInfo">
            <img src={message.senderId == currentUser.uid ? currentUser.photoURL : data.user.photoURL} alt="" srcset="" />
            <span>just now</span>
        </div>
        <div className="messageContent">
              <p>{message.text}</p>
              {
                message.img &&  <img src={message.img} alt="" srcset="" />}
              
        </div>
    </div>
  )
}

export default Message