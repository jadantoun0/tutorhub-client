import React, { useState } from 'react'
import { CircularProgress } from '@mui/material';

const CustomButton = ({onClick, text, color}) => {

  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    await onClick();
    setIsLoading(false);
  }

  return (
    <button
      onClick={handleClick}
      className={`rounded-lg px-3 py-1.5 text-sm 
        ${color === 'white' ? 'bg-white text-black' : 
          color === 'gray' ? 'bg-gray text-black' :
          color === 'red' ? 'bg-red-500 text-white':
          'bg-violet text-white'}
      `}
      disabled={isLoading}
    >
      <div className='flex justify-center items-center gap-x-2'>
        {text}
        {isLoading && <CircularProgress size={15} style={color && color !== 'red'? {color: "black"} : {color: "white"}}/> }
      </div>
  </button>
  )
}

export default CustomButton