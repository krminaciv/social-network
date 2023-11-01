import './css/menu.css'
import { auth } from '../config/firebase';
import { signOut } from 'firebase/auth'
import React, { useEffect, useState } from 'react';

function Menu() {

     const [user, setUser] = useState(null);
          useEffect(() => {
          const unsubscribe = auth.onAuthStateChanged((authUser) => {
          if (authUser) {
          // User is signed in
          setUser(authUser);
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

     return (
          <div className="menu">
               <div className="menu-logo">Neophile</div>
               <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="#">Questions</a></li>
                    <li><a href="#">Jobs</a></li>
               </ul>
               <div>
                    { user ? (
                         <div>
                              <a href="" className="profile-button">{user?.email}</a>
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