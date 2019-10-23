import React from 'react'
import './userImage.css'

export default function PostUserImege(props) {

  const letter = props.name.slice(0,2).toUpperCase();
  
  return (
    <div className="image-wrapper">
        <div className="user-image">
            <span>{letter}</span>
        </div>
    </div>
  )
}
