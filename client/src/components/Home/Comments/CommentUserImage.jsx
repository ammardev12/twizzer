
import React, { useState } from 'react'
import '../Posts/userImage.css'

export default function CommentUserImege(props) {
  const [ username, setUsername ] = useState(props.name )
  // if(username) {
  //   const letter = username.slice(0,2).toUpperCase();
  //   return letter;
  // }
 
  
  return (
    <div className="comment-image-wrapper">
        <div className="comment-user-image">
            <span>{ username ? username.slice(0,2).toUpperCase() : "" }</span>
        </div>
    </div>
  )
}
