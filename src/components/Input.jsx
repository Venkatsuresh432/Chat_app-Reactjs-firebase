import React, { useContext, useState } from 'react'
import Img from '../assets/img.png'
import Attach from "../assets/attach.png"
import { ChatContext } from '../context/ChatContext';
import { AuthContext } from '../context/AuthContext';
import { arrayUnion, doc, serverTimestamp, Timestamp, updateDoc } from 'firebase/firestore';
import { db, storage } from '../firebase';
import { v4 as uuid } from 'uuid';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

const Input = () => {

  const [text, setText] =useState("");
  const [img, setImg] = useState(null);
  const [err, setErr] = useState("")

    const {currentUser} = useContext(AuthContext);
    const {data} = useContext(ChatContext);

    const handleSend = async () =>{
      if(img){
          const storageRef = ref(storage, uuid());
          const uploadTask = uploadBytesResumable(storageRef, img);
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
                           await updateDoc(doc(db, 'chats', data.chatId),{
                              messages:arrayUnion({
                                id: uuid(),
                                text,
                                senderId: currentUser.uid,
                                date:Timestamp.now(),
                                img:downloadURL
                              })
                            });
                     });
                   }
                 );
      }
      else{
          await updateDoc(doc(db, 'chats', data.chatId),{
                      messages:arrayUnion({
                        id: uuid(),
                        text,
                        senderId: currentUser.uid,
                        date:Timestamp.now()
                      })
                    });
      }

      await updateDoc(doc(db,"userChats", currentUser.uid),{
            [data.chatId+".lastMessage"]:{
                text
            },
            [data.chatId+'.date'] : serverTimestamp() 
      })
       await updateDoc(doc(db,"userChats", data.user.uid),{
            [data.chatId+".lastMessage"]:{
                text
            },
            [data.chatId+'.date'] : serverTimestamp() 
      })


      setText("");
      setImg(null);
    }

  return (
    <div className='input'>
    <input type="text" placeholder='Type something... ' value={text} onChange={e=>setText(e.target.value) }/>
    <div className="send">
      <img src={Attach} alt=""  />
      <input type="file" style={{ display:'none'}} name="" id="file" value={img} onChange={e=> setImg(e.target.files[0])} />
      <label htmlFor="file">
        <img src={Img} alt="" />
      </label>
      <button onClick={handleSend}>Send</button>

    </div>
    </div>
  )
}

export default Input