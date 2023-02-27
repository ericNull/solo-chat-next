import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';


var config = {
  apiKey: "AIzaSyB9014wHsIBzRhLDvoSbwq3KsO4x8xOGtg",
  authDomain: "solo-chat-e3be7.firebaseapp.com",
  projectId: "solo-chat-e3be7",
  storageBucket: "solo-chat-e3be7.appspot.com",
  messagingSenderId: "66142476835",
  appId: "1:66142476835:web:cd4f1c23b2d1faaf08ef96"
};
firebase.initializeApp(config);
const db = firebase.firestore();


let socketIo = io("http://localhost:4000",{ transports: ["websocket"] });
export default function Home() {
  
 const [message, setMessage]=useState("");
 const [messages, setMessages]=useState([]);

  function sendMessage(){
         console.log("entering");
         socketIo.emit("message", {message});
         db.collection("main_chat").add({
          message: message,
         timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
         const node = document.getElementsByClassName('text');
         node[0].value = '';
         setMessage(" ");
         
  }
  socketIo.on("sentback", (payload)=>{setMessages([...messages, payload])})
  return (
  <div>
  <input className ='text'type="text" name="message" placeholder="message to send" onChange={(e)=>setMessage(e.target.value)}/>
  <button onClick={sendMessage}>send message</button>
  {
  messages.map((mes,key)=><div>{mes}</div>
)}
  </div>
  )
}



