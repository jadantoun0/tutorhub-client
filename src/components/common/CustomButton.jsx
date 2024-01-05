import React, { useState } from 'react'
import CustomLoadingSpinner from './CustomLoadingSpinner';

const CustomButton = ({onClick, text, color, style = {}}) => {

  const [isLoading, setIsLoading] = useState(false)

  const handleClick = async () => {
    setIsLoading(true);
    await onClick();
    setIsLoading(false)
  }

  return (
    <button
      onClick={handleClick}
      style={style}
      className={`rounded-lg px-3 py-1.5 text-sm ${color === 'secondary' ? 'bg-white text-black' : 'bg-violet text-white'}`}
      disabled={isLoading}
    >
    {text} {isLoading && <CustomLoadingSpinner color={'white'} isSmall={true}/>}
  </button>
  )
}

export default CustomButton