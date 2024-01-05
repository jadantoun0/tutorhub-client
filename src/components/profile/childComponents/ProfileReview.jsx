import React from 'react'

const ProfileReview = ({review}) => {
  return (
    <div className='mt-5'>
        <p className='font-bold text-sm'>{review?.title}</p>
        <p className='text-sm'>{review?.content}</p>
    </div>
  )
}

export default ProfileReview