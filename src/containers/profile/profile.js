import { auth, db } from '../../config/firebase';
import React, { useEffect, useState } from 'react';
import { getDocs, collection, query, where, addDoc, serverTimestamp } from 'firebase/firestore'
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faPencil } from '@fortawesome/free-solid-svg-icons'
import { Post } from '../../components/post'
import './profile.css'


function Profile() {

     const { username } = useParams();

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


     const [posts, setPosts] = useState([]);
     const postsCollection = collection(db, "posts");

     useEffect(() => {
          const getPosts = async () => {
               try {
                    const q = query(postsCollection, where("user", '==', username));
                    const data = await getDocs(q)
                    const list = data.docs.map((doc) => ({
                         ...doc.data(),
                         id: doc.id
                    }))
                    setPosts(list)
                    console.log(list)
               } catch (err) {
                    console.error(err)
               }
          }
          getPosts();
     }, []);

     /*
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
          } catch (err) {
               console.log(err)
          }
     }
     getUsername();
     */


     return (
          <div className="Profile">
               
               {auth?.currentUser?.user}
               <div className="profile-info">
                    <img src="covers/cover-photo-13.jpg" className="cover-img" />
                    {(user == username) ? (
                         <FontAwesomeIcon icon={faPencil} className="edit-icon" />
                    ) : (
                         <p>alo</p>
                    )}
                    <img src="user-icon.png" className="profile-img" alt="Profile Picture" />
                    <div className="container-uf">
                         <h2 className="username-text">@{username}</h2>
                         <div className="container-f">
                              <FontAwesomeIcon icon={faUser} />
                              <p className="followers-text">56</p>
                         </div>
                    </div>
                    <div className="description"><p>istok je levo!</p></div>
               </div>

               <br/><br/>

               <div className="content">
                    {posts.slice().reverse().map((post) => (
                         <Post post={post} />
                    ))}
               </div>

               <br/><br/>

          </div>
     )

}

export default Profile;

//3,6,7