import React from 'react'

const MyButton = ({onClick, text, color, disabled = false, style = {}}) => {

  const handleClick = async () => {
    onClick();
  }

  return (
    <button
      onClick={handleClick}
      style={style}
      disabled={disabled}
      className={`rounded-lg px-3 py-1.5 text-sm ${color === 'gray' ? 'bg-gray text-black' : 'bg-violet text-white'}`}
    >
    {text}
  </button>
  )
}

export default MyButton