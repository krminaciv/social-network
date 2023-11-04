import { auth, db } from '../../config/firebase';
import React, { useEffect, useState } from 'react';
import { getDocs, collection, query, where, addDoc, serverTimestamp } from 'firebase/firestore'
import { Post } from '../../components/post'
import "./home.css"



function Home() {


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
  getUsername();


  const [posts, setPosts] = useState([]);
  const postsCollection = collection(db, "posts");

  useEffect(() => {
    const getPosts = async () => {
      try {
        const data = await getDocs(postsCollection)
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


  const [newPost, setNewPost] = useState("");
  //postsCollection already exists
  const createNewPost = async () => {
    try{
      await addDoc(postsCollection, {
        text: newPost,
        user: username,
        created_at: serverTimestamp(),
      })
      window.location.href = "/";
    }catch(err){
      console.error(err)
    }
  }



  
    
  return (
    
    <div className="Home">

      <br />

      <div className="post-box">
        <div className="user-avatar">
          <img src="/user-icon.png" alt="User Avatar" />
        </div>
        <div className="post-input">
          <textarea className="textarea" onChange={(e) => setNewPost(e.target.value)} rows="5" placeholder="What's on your mind?"></textarea>
        </div>
        <div className="post-actions">
          <button className="post-button" onClick={createNewPost}>Post</button>
        </div>
      </div>


      <br /><br />

      <h2 className="timeline">Timeline</h2>
      <div className="content">
        {posts.slice().reverse().map((post) => (
          <Post post={post} />
        ))}
      </div>

      <br/><br/>

    </div>
  );
}


export default Home;