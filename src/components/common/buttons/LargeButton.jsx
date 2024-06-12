import React from 'react'

const LargeButton = ({onClick, text, style, color}) => {
    return (
        <button
          onClick={onClick}
          style={style}
          className={`rounded-lg px-3 py-0.5 h-10 text-lg lg:text-xl lg:h-12 lg:rounded-xl
            ${color === 'gray' ? 'bg-gray text-black hover:opacity-90' : 'bg-violet text-white hover:opacity-90'}`
          }
        >
        {text} 
      </button>
      )
}

export default LargeButton