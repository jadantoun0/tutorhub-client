import CircularProgress from '@mui/material/CircularProgress';
import React from 'react';

const WideButton = ({text, isLoading, onClick, color}) => {
  return (
    <button 
        onClick={onClick}
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