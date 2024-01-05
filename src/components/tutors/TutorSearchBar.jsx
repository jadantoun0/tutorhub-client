import React from 'react'
import SearchIcon from '@mui/icons-material/Search';


const TutorSearchBar = ({value, setValue}) => {
  return (
    <div className='relative' style={{minWidth: "25rem"}}>
        <input type="text" value={value} onChange={(e) => setValue(e.target.value)} className='bg-gray h-10 rounded-lg focus:outline-none focus:border-violet focus:border-2 pl-5 placeholder:text-black placeholder:text-sm w-full' placeholder='Search for tutor name' />
        <div className='absolute right-0 top-0 bottom-0 w-20 rounded-r-lg bg-violet grid place-items-center'>
            <SearchIcon style={{color: 'white'}}/>
        </div>
    </div>

  )
}

export default TutorSearchBar