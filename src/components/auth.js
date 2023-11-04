import {auth} from '../config/firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { getDocs, collection, addDoc } from 'firebase/firestore'
import { db } from "../config/firebase"
import { useState } from 'react';
import './css/auth.css'

export const Auth = () => {

     const [email, setEmail] = useState("");
     const [password, setPassword] = useState("");
     const [username, setUsername] = useState("");

     const usersCollection = collection(db, "users");

     const signIn = async () => {
          try {
               //firebase auth
               const userAuth = await createUserWithEmailAndPassword(auth, email, password)

               //firebase firestore
               await addDoc(usersCollection, {
                    username: username,
                    userID: auth?.currentUser?.uid
               }, {id: auth?.currentUser?.uid})

          } catch(err) {
               console.error(err)
          }
     }
     //console.log(auth?.currentUser?.uid)  
     console.log(auth?.currentUser?.email)  


     return(
          <div className="auth-form">
               <input placeholder="Email" type='email' onChange={(e) => setEmail(e.target.value)} />
               <input placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} />
               <input placeholder="Username" type="text" onChange={(e) => setUsername(e.target.value)} />
               <button onClick={signIn}>Sign In</button>
          </div>
     )
}