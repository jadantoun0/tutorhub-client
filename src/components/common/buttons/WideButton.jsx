import CircularProgress from '@mui/material/CircularProgress';
import React, { useState } from 'react';

const WideButton = ({text, onClick, color}) => {

  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async (e) => {
    setIsLoading(true);
    await onClick(e);
    setIsLoading(false);
  }

  return (
    <button 
        onClick={handleClick}
        className={`w-full text-sm py-2 rounded-lg mt-5 hover:opacity-90 ${color === 'white' ? 'bg-white text-black' : "bg-violet text-white"}`}
    >
        <div className='flex justify-center items-center gap-x-2'>
            {text} 
            {isLoading && <CircularProgress size={15} style={color === 'white' ? {color: "black"} : {color: "white"}}/> }
        </div>
    </button>
  )
}

export default WideButton