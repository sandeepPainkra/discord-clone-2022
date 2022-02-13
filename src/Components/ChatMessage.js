import React from 'react'
import "./ChatMessage.css"
const ChatMessage = ({imgUrl,message}) => {
  return (
    <div className='chatmessage'>
        <img src={imgUrl}  />
        <h2>{message}</h2>
    </div>
  )
}

export default ChatMessage