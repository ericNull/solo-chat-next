import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

let socketIo = io("http://localhost:4000",{ transports: ["websocket"] });
export default function Home() {
  
 const [message, setMessage]=useState("");
 const [messages, setMessages]=useState([]);

  function sendMessage(){
         console.log("entering");
         socketIo.emit("message", {message});
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



