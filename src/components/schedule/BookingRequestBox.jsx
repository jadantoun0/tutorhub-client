import React from 'react'
import { formatDateWithDayName } from '../../utils/global'
import { useAcceptAppointmentMutation, useDeleteAppointmentMutation } from '../../redux/services/appointmentsSlice'
import CustomButton from '../common/buttons/CustomButton';

const BookingRequestBox = ({appointment}) => {

  const isTutor = appointment.student?.email ? true : false;
  const viewedUser = isTutor? appointment.student : appointment.tutor
  
  const [acceptAppointment] = useAcceptAppointmentMutation();
  const [deleteAppointment] = useDeleteAppointmentMutation();

  const acceptRequest = async () => {
    try {
      await acceptAppointment(appointment._id);
    } catch(err) {
      console.log(err);
    } 
  }

  const declineRequest = async () => {
    try {
      await deleteAppointment(appointment._id);
    } catch(err) {
      console.log(err);
    }
  }

  return (
    <article 
      className='flex w-80 py-4 px-2 rounded-md' 
      style={{
        borderWidth: "1px", 
        borderColor: '#D1D1D1', 
        boxShadow: 'rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px',
      }} 
    >
        <div className='w-1/5 flex justify-center'>        
            {
            viewedUser.profilePic ?
              <img src={`data:image/jpeg;base64,${viewedUser.profilePic}`} alt="" className="object-cover w-10 h-10 rounded-full"/> :
              <img src='/images/pp.png' alt="default img" className="w-12 h-12 object-cover rounded-full"/> 
            }
        </div>

        <div className='w-4/5 flex flex-col justify-center px-2'>
            <p className='font-bold text-lg'>{viewedUser.firstName} {viewedUser.lastName}</p>
            <p className='text-sm'>
              Requested a meeting on <b>{formatDateWithDayName(appointment.date)} </b> 
            </p>
            <div className='mt-2 flex gap-x-5'>
                <CustomButton text='Decline' color="gray" onClick={declineRequest} />
                <CustomButton text='Accept' onClick={acceptRequest} />
            </div>
        </div>
    </article>
  )
}

export default BookingRequestBox