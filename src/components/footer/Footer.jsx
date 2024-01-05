import React from 'react'
import {Link} from 'react-router-dom'

const Footer = () => {
  return (
    <footer className='mt-20 h-56 bg-violet py-2 w-full'>
      <div className='max-w-screen-2xl mx-auto'>
        <div className='flex justify-center'>
            <img src="/images/logo/TutorHub Logo without text.png" alt="Logo" className='h-16' />
        </div>
        <p className='flex text-white gap-x-4 mt-5 text-center justify-center'>
            <Link to=''>Home</Link>
            <Link to=''>Features</Link>
            <Link to=''>Pricing</Link>
            <Link to=''>FAQs</Link>
            <Link to=''>About</Link>
        </p>

        <hr className='text-white w-3/5 mx-auto mt-7'/>
        <p className='text-white text-center mt-7'>
        <span>&copy;</span> 2024, TutorHub, Inc
        </p>

      </div>

    </footer>
  )
}

export default Footer