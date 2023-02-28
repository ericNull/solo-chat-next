import React, {useState} from 'react';
import firebase from "firebase/compat/app";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from 'next/router';


var config = {
  apiKey: "AIzaSyB9014wHsIBzRhLDvoSbwq3KsO4x8xOGtg",
  authDomain: "solo-chat-e3be7.firebaseapp.com",
  projectId: "solo-chat-e3be7",
  storageBucket: "solo-chat-e3be7.appspot.com",
  messagingSenderId: "66142476835",
  appId: "1:66142476835:web:cd4f1c23b2d1faaf08ef96"
};
const app=firebase.initializeApp(config);
const auth=getAuth(app);



export default function login() {
const [email, setEmail]=useState('');
const [password, setPassword]=useState('');
const route = useRouter()

 function register(){
  signInWithEmailAndPassword(auth, email, password).then((user) => {
    route.push("/");
    
})
}
  return (
    <div>
      <input name='email' className='email' onChange={(e)=>setEmail(e.target.value)}/>
      <input name='password' className='password' onChange={(e)=>setPassword(e.target.value)}/>
      <button onClick={register}>login</button>
    </div>
  )
}