import React from 'react'
import './css/post.css'

export const Post = (p) => {

     const { post } = p;
     const createdAt = post.created_at.toDate().toString().substring(4,21);
     

     return (
          <div className="container">
               <div className="user-info">
                    <img src="/user-icon.png" className="icon" />
                    <div className="username-created-div">
                         <p>{post.user}</p>
                         <p className="created-at">{createdAt}</p>
                    </div>
               </div>
               <br/>
               <div className="text">{post.text}</div>
          </div>
     )

}


