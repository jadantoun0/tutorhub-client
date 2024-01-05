import React, { useState } from 'react'
import CustomLoadingSpinner from './CustomLoadingSpinner';

const Button = ({text, onClick, color, style}) => {
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
        className={`rounded-lg px-3 py-1.5 text-sm 
            ${color === 'white' && 'bg-white text-black'}
            ${color === 'violet' && 'bg-violet text-white'}
            ${color === 'gray' && 'bg-gray text-black'}    
        `}
        disabled={isLoading}
      >
      {text} {isLoading && <CustomLoadingSpinner color={'white'} isSmall={true}/>}
    </button>
    )
}

export default Button