import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

let socket = io("http://localhost:4000",{ transports: ["websocket"] });
export default function Home() {
  
 const [message, setMessage]=useState("");

  function sendMessage(){
         console.log("entering");
         socket.emit("message", {payload:message});
         setMessage(" ");
         
  }
  return (
  <div>
  <input type="text" name="message" placeholder="message to send" onChange={(e)=>setMessage(e.target.value)}/>
  <button onClick={sendMessage}>send message</button>
  <div>{message}</div>
  </div>
  )
}



