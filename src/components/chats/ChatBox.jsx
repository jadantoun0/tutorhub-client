import React from 'react'

const ChatBox = ({message, isTutor}) => {

  const isSender = 
    (isTutor && message.sender === 'tutor') || (!isTutor && message.sender === 'student')

  return (
      <li className={`flex ${isSender ? 'justify-start' : 'justify-end'}`}>
        <div className={`relative max-w-xl px-4 py-2 rounded-3xl shadow ${isSender ? 'text-white bg-violet' : 'text-gray-700 bg-gray'}`}>
          <span className="block">{message.messageContent}</span>
        </div>
      </li> 
  )
}

export default ChatBox