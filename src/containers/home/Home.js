import { auth, db } from '../../config/firebase';
import React, { useEffect, useState } from 'react';
import { getDocs, collection, query, where } from 'firebase/firestore'
import { Post } from '../../components/post'
import { Footer } from '../../components/footer'
import "./home.css"



function Home() {

  const [posts, setPosts] = useState([]);
  const postsCollection = collection(db, "posts");
  const usersCollection = collection(db, "users");

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

  /*
  const [userData, setUserData] = useState(null);
  //const [test, setTest] = useState("");

  const getUsername = async () => {
    try {
      const q = query(usersCollection, where("userID", '==', user?.uid));
      const querySnapshot = await getDocs(q);
      const userDataArray = [];
      querySnapshot.forEach((doc) => {
        userDataArray.push({ id: doc.id, ...doc.data() });
      });
      setUserData(userDataArray);
      
      console.log("array je: " + userDataArray)
      if(!querySnapshot.empty){
        setTest(userDataArray[0].username)
      }
      console.log("test je: " + test)
      
    } catch(err) {
      console.error(err)
    }
  }
  
  useEffect(() => {

    getUsername();
  },[]);
  */
  //{user ? (<p>welcome, {user?.email}</p>) : (<p>not logged in</p>)}
  /*
  <div>
      <h2>User Data:</h2>
      {userData ? (
        <ul>
          {userData.map((user) => (
            <li key={user.id}>{user.username}</li>
          ))}
        </ul>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  */
  return (
    
    <div className="Home">

      

      <br />

      <div class="post-box">
        <div class="user-avatar">
          <img src="/user-icon.png" alt="User Avatar" />
        </div>
        <div class="post-input">
          <textarea rows="5" placeholder="What's on your mind?"></textarea>
        </div>
        <div class="post-actions">
          <button class="post-button">Post</button>
        </div>
      </div>


      <br /><br />

      <h2 className="timeline">Timeline</h2>
      <div className="content">
        {posts.map((post) => (
          <Post post={post} />
        ))}
      </div>

      <br/><br/>
      <Footer />

    </div>
  );
}


export default Home;