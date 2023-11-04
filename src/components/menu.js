import './css/menu.css'
import { auth, db } from '../config/firebase';
import { signOut } from 'firebase/auth'
import React, { useEffect, useState } from 'react';
import { getDocs, collection, query, where } from 'firebase/firestore'

function Menu() {

     const [user, setUser] = useState(null);
          useEffect(() => {
          const unsubscribe = auth.onAuthStateChanged((authUser) => {
          if (authUser) {
          // User is signed in
          setUser(authUser);
          getUsername();
          } else {
          // User is signed out
          setUser(null);
          }
          });
     })

     const logout = async () => {
          try {
            await signOut(auth)
            window.location.href = "/";
          } catch(err){
            console.error(err)
          }
     }

     const usersCollection = collection(db, "users");
     const [username, setUsername] = useState(null);
     const getUsername = async () => {
          try {
               const q = query(usersCollection, where("userID", '==', user?.uid));
               const querySnapshot = await getDocs(q);
               //const userDataArray = [];
          if (!querySnapshot.empty) {
               const userData = querySnapshot.docs[0].data();
               setUsername(userData.username);
          }
          } catch(err){
               console.log(err)
          }
     }

     const showHome = () => {
          window.location.href = "/";
     }

     return (
          <div className="menu">
               <div className="menu-logo" onClick={showHome}>Neophile</div>
               <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="#">Questions</a></li>
                    <li><a href="#">Jobs</a></li>
               </ul>
               <div>
                    { user ? (
                         <div>
                              <a href={`/${username}`} className="profile-button">@{username}</a>
                              <button onClick={logout} className="logout-button">Logout</button>
                         </div>
                    ) : (
                         <a href='/login' className='login-button'>Log in</a>
                    )}
               </div>
          </div>
     )
}

export default Menu