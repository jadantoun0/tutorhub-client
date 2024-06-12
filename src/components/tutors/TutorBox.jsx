import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import CustomButton from '../common/buttons/CustomButton';
import { calculateRating, capitalizeFirstLetter } from '../../utils/global';
import { Rating } from '@mui/material';

const TutorBox = ({tutor}) => {

    const rating = calculateRating(tutor.reviews)
    const navigate = useNavigate();

  return (
    <Link to={`/tutors/${tutor._id}`} className='bg-gray shadow-sm rounded-2xl min-h-80 w-140 p-5 pl-14' style={{minHeight: "20rem"}}>
        <div className='flex  items-center gap-x-8'>
            {
                tutor.profilePic ? 
                    <img src={`data:image/jpeg;base64,${tutor.profilePic}`} alt="profile pic" className='h-20 w-20 object-cover rounded-full' /> :
                    <img src='/images/pp.png' alt='profile pc' className='h-16 w-16 object-cover rounded-full'/>
            }
            <div>
                <p className='text-2xl font-bold '>{tutor.firstName}  {tutor.lastName}</p>
                <p className='text-sm'> {tutor.position}</p>
                <p className='text-sm'> {capitalizeFirstLetter(tutor.subject)} Tutor</p>
            </div>
        </div>
        <hr className='text-white white my-4'/>


        <div className='flex'>
            
            <main className='flex flex-col gap-y-2 w-4/6 text-sm'>
                <p>{tutor.bio}</p>
                <p>
                    <span className='font-bold'>Skills: </span>
                    {tutor.skills[0]}, {tutor.skills[1]}{tutor.skills[2] && <span>...</span>}
                </p>
                <p>
                    <span className='font-bold'>Languages: </span>
                    {tutor.languages}
                </p>
            </main>
            
            <aside className='w-2/5 flex flex-col gap-2 justify-center items-center'>
                <p className='text-lg font-bold'>${tutor.hourlyRate}/hour</p>
                {tutor.reviews.length > 0 && <Rating name="half-rating-read" value={rating} precision={0.5} readOnly />}
                <CustomButton text='View Profile' onClick={() => navigate(`/tutors/${tutor._id}`)}/>
            </aside>
        </div>


    </Link>
  )
}

export default TutorBox