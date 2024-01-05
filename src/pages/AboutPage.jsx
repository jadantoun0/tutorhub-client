import React from 'react'

// This is the about page for visitors introducing the website for them, so it doesn't contain any server-side data
const AboutPage = () => {

    const whoAreWe = `At TutorHub, we are more than just a platform - we are a team of dedicated 
     individuals with a shared passion for education. We believe in the transformative power of 
     learning and the profound impact it can have on students' lives. Our team is committed to 
     making quality education accessible and tailored to every learner's unique needs.`;

    const missionAndVision = `Our mission is clear: to bridge the gap between students seeking
     academic support and skilled tutors ready to provide guidance. We envision a world where 
     learning is not bound by geographic limitations, where students have access to the best 
     tutors, and where educational experiences are enriching, empowering, and highly personalized.`;

    const values = [
        'Excellence: We are committed to delivering high-quality educational experiences',
        'Empathy: We understand the unique needs and challenges of both students and tutors',
        'Innovation: We embrace technology to enhance learning and teaching',
        'Integrity: We prioritize trust, safety, and authenticity in every interaction',
        'Community: We foster a supportive and engaging learning community.'
    ]

    const getInTouch = `We welcome your questions, feedback, and ideas. If you'd like to learn 
    more about our team or have any inquiries, please don't hesitate to reach out to us at 
    tutorhub@info.com. We're here to help you on your educational journey. Thank you for choosing 
    TutorHub as your trusted partner in education.`


  return (
    <div className='max-w-screen-2xl 2xl:mx-auto'>
        <div className='mx-5 sm:mx-10 md:mx-20 lg-mx-28'>
            <div className='grid place-items-center'>
                <img 
                    src="/images/logo/TutorHub Logo on Wall.png" 
                    alt="Logo on wall" 
                    className='w-3/4 max-w-96'
                />
            </div>

            <p className='mt-10 text-lg font-bold'>Who Are We</p>
            <p>{whoAreWe}</p>

            <p className='mt-10 text-lg font-bold'>Our Mission and Vision</p>
            <p>{missionAndVision}</p>
            
            <p className='mt-10 text-lg font-bold'>Our Values</p>
            <p className='pb-2'>
                As a team, we uphold a set of core values that drive everything we do:
            </p>
            <ul>
                {
                values.map((value, index) =>
                     <li key={index}><span className='mr-2'>&#x2022;</span>{value}</li>)
                }
            </ul>

            <p className='mt-10 text-lg font-bold'>Get in Touch</p>
            <p>{getInTouch}</p>
            
            
        </div>

    </div>
  )
}

export default AboutPage