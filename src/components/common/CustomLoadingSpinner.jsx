import { CircularProgress } from '@mui/material'
import React from 'react'

const CustomLoadingSpinner = ({isSmall}) => {
  return (
      isSmall ? 
        <CircularProgress style={{ color: "white", width: '13px', height: '13px'}} />
        :
        <div className='grid place-items-center w-screen h-screen'>
          <CircularProgress style={{color: '#592ACD'}} />
        </div>
  )
}

export default CustomLoadingSpinner