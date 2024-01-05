import React from 'react'
import { useNavigate } from 'react-router-dom'
import LargeButton from '../common/LargeButton';

const IntroductoryImage = () => {
  const navigate = useNavigate();

  return (
    <div className='mx-auto mt-10 mb-0 lg:mb-5 w-full flex flex-col-reverse justify-center items-center lg:flex-row'>
        <div className='w-3/4 lg:w-1/2 flex flex-col justify-center pt-3 items-center lg:p-7 text-center mx-auto'>
            <p className='font-bold text-3xl lg:text-4xl xl:text-5xl'>
                Find your academic spark with TutorHub
            </p>
            <div className='flex gap-x-5 mt-5'>
                <LargeButton text="Sign in" color="gray" onClick={() => navigate('/signin')}/>
                <LargeButton text="Register Now" onClick={() => navigate('/register')}/>
            </div>
        </div>
        <img src="/images/tutoring bg.png" alt="Tutoring" className='sm:w-4/5 lg:w-1/2'/>

    </div>
  )
}

export default IntroductoryImage