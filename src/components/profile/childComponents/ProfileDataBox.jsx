import { Rating } from '@mui/material'
import React from 'react'
import ProfileReview from './ProfileReview'
 
const ProfileDataBox = ({title, content, rating, ratingsNumber, reviews}) => {
  return (
    <>
        <div className='flex flex-col md:flex-row py-5'>
            <p className='text-sm font-bold md:w-1/5'>{title}</p>
            {
                content && 
                <p className='text-sm md:w-4/5'>
                    {
                        Array.isArray(content) ? (
                            title !== 'Skills' ?
                                content.map(element => <li>{element}</li>) :
                                <div className='grid grid-cols-2'>
                                    {content.map(element => <li>{element}</li>)}
                                </div>
                        ) : (
                            content
                        )
                    }
                </p> 
            }
            {
                rating && (
                    <div className='md:w-4/5 flex'>
                    <Rating name="half-rating-read" value={rating} precision={0.5} readOnly />
                    <p className='pl-5 text-sm'>({ratingsNumber} ratings)</p>
                    </div>
                ) 
            }
            {
                reviews && (
                    <div className='md:w-4/5'>
                    {reviews.map(review => <ProfileReview review={review} />)}
                    </div>
                )
                
            }
            {/* <CustomTextField value={} /> */}
        </div>
        <hr className='text-white white'/>
    </>
  )
}

export default ProfileDataBox