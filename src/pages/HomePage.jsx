import React from 'react'
import Subject from '../components/home/Subject'
import FeaturesBox from '../components/home/FeaturesBox'
import IntroductoryImage from '../components/home/IntroductoryImage'
import RoundedButton from '../components/common/RoundedButton'
import { useNavigate } from 'react-router-dom'

// This is the home page for visitors introducing the website for them, so it doesn't contain any server-side data
const HomePage = () => {

   const navigate = useNavigate();

    return (
       <div className='max-w-screen-2xl 2xl:mx-auto'>
         <main className='flex flex-col justify-center mx-5 sm:mx-10 md:mx-20 lg-mx-28'>
            
            <IntroductoryImage />
            
            <p className='mt-20 mb-3 text-lg font-bold'>Popular Subjects</p>

            <section className='grid xl:grid-cols-2 gap-x-2 gap-y-2 mx-auto'>
               
               <div className='flex flex-col sm:flex-row gap-x-2 gap-y-2'>
                  <Subject image='/images/subjects/computer science.jpeg' title="Computer Science" isBig={true} /> 
                  <div className='flex flex-col gap-y-2 '>
                     <Subject image='/images/subjects/physics.jpeg' title="Physics"/>          
                     <Subject image='/images/subjects/chemistry.jpeg' title="Chemistry"/>          
                  </div>     
               </div>
                   
               <div className='flex flex-col sm:flex-row-reverse  xl:flex-row gap-x-2 gap-y-2'>
                  <Subject image='/images/subjects/economics.jpeg' title="Economics" isBig={true}/> 
                  <div className='flex flex-col gap-y-2'>
                     <Subject image='/images/subjects/math.jpeg' title="Mathematics"/>          
                     <Subject image='/images/subjects/biology.jpeg' title="Biology"/>          
                  </div>         
               </div> 

            </section>


            <section className='mt-20'>
               <p className='mb-5 text-lg font-bold'>Who are we</p>
               <p>
                  TutorHub is an innovative online platform designed to bridge the gap between students seeking 
                  academic support and skilled tutors ready to provide guidance. Our platform facilitates seamless 
                  interaction between students and tutors, ensuring that educational experiences are both enriching 
                  and highly tailored. Whether you're a student seeking guidance or a tutor looking to share your 
                  expertise, TutorHub provides a robust platform for meaningful educational connections.
               </p>
            </section>


            <section className='mt-20'>
               <p className='mb-5 text-lg font-bold'>What we offer</p>

               <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-y-10'>
                  <FeaturesBox title="Tutor Matching" image="/images/features/tutor matching.png"/>
                  <FeaturesBox title="Session Booking" image="/images/features/booking.jpeg"/>
                  <FeaturesBox title="Convenient Scheduling" image="/images/features/scheduling.jpeg"/>
                  <FeaturesBox title="Instant Messaging" image="/images/features/chatting.webp"/>
                  <FeaturesBox title="Real-time video meetings" image="/images/features/real-time video conferencing.webp"/>
                  <FeaturesBox title="Transparent Reviews" image="/images/features/feedback.png"/>
               </div>
            </section>

            <section className='mt-20 flex flex-col gap-y-3 align-center'>
               <h1 className='text-2xl font-bold text-center'>Don't waste time</h1>
               <RoundedButton text='Register now' onClick={() => navigate('/register')}/>

               <p className='text-center font-semibold'>and benefit from our never-ending services</p>
            </section>

          </main>
       </div>
      
    )
}

export default HomePage