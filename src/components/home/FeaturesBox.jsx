import React from 'react'

const FeaturesBox = ({title, image}) => {
  return (
    <article className='flex flex-col items-center gap-y-3'>
        <p className='font-bold text-sm'>{title}</p>
        <div className='relative'>
            <img src={image} alt="" className='x-full y-full object-cover w-56 h-56'/>
            <div className='absolute inset-0 bg-violet opacity-50'></div>
        </div>
    </article>
  )
}

export default FeaturesBox