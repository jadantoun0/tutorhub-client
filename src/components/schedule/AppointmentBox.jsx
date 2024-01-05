import React from 'react'

const AppointmentBox = ({appointment}) => {

    const isTutor = appointment.student?.email ? true: false;
    const viewedUser = isTutor? appointment.student : appointment.tutor
    
    
  return (
    <div className='w-72 rounded-md flex text-white bg-violet p-2'>
        <div className='w-2/5 flex justify-center'>
        {
            viewedUser.profilePic ?
              <img src={`data:image/jpeg;base64,${viewedUser.profilePic}`} alt="" className="object-cover w-14 h-14 rounded-full"/> :
              <img src='/images/pp.png' alt="default img" className="w-14 h-14 object-cover rounded-full"/> 
         }
        </div>
        <div className='w-3/5'>
            <p className='text-s font-semibold mb-1.5'>{viewedUser.firstName} {viewedUser.lastName}</p>
            <p className='text-xs'><b>Course:</b> {appointment.courseName}</p>
        </div>

    </div>
  )
}

export default AppointmentBox