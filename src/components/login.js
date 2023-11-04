import {useState} from 'react';
import './css/login.css'
import {auth} from '../config/firebase'
import {signInWithEmailAndPassword} from 'firebase/auth'

export const Login = () => {

     const [email, setEmail] = useState("");
     const [password, setPassword] = useState("");

     const handleLogin = async () => {
          try {
               //await firebase.auth().signInWithEmailAndPassword(email, password);
               await signInWithEmailAndPassword(auth, email, password)
               window.location.href = "/";
               // User is now logged in
          } catch (error) {
               console.error('Login failed', error);
          }
     };

     return(
          <div className="login-form">
               <input placeholder="Email" type='email' onChange={(e) => setEmail(e.target.value)} />
               <input placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} />
               <button className="" onClick={handleLogin}>Log In</button>
          </div>
     )

}