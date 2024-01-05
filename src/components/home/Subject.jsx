import React from 'react'
import {Link} from 'react-router-dom'

const Subject = ({image, title, isBig = false}) => {

    return (   
        <Link to={`/tutors?subject=${title.toLowerCase()}`} className={`relative w-64 shrink-0 ${!isBig && 'h-40 bg-red-400'}`}>
            <img src={image} alt="subject" className='object-cover h-full w-full' /> 
            <div className='absolute inset-0 bg-violet opacity-30' ></div>
            <div className='bg-gray absolute py-1 px-1.5 left-1.5 bottom-2 text-xs rounded-xl grid place-items-center'>
                {title}
            </div>
        </Link>

     )

}

export default Subject