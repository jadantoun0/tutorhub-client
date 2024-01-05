import React from 'react'

const EnrolledStudentBox = ({student}) => {
  return (
    <article   
        className='flex items-center px-5 gap-x-5 h-16'
        style={{ borderBottom: "1px solid #ccc"}}
    >
        <img 
            src={student.profilePic ? student.profilePic : '/images/pp.png'} 
            alt="pp" 
            className='w-10 h-10 rounded-full' 
        />
        <p>{student.firstName} {student.lastName}</p>
    </article>

  )
}

export default EnrolledStudentBox