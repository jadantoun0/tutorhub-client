import React from 'react'
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/store/userSlice';
import { truncateMessage } from '../../utils/messageUtils';
import { Link } from 'react-router-dom';

const DashboardMessageBox = ({message}) => {

  // retrieving from the message object the user that the logged user is chatting with
  const isTutor = useSelector(selectUser)?.role?.toLowerCase() === 'tutor';
  const user = isTutor ? message.student : message.tutor;

  return (
    <Link 
        to='/chats'
        className='flex w-80 py-4 px-2 rounded-md' 
        style={{
        borderWidth: "1px", 
        borderColor: '#D1D1D1', 
        boxShadow: 'rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px',
        }} 
  >
      <div className='w-1/5 flex justify-center'>        
          {
          user.profilePic ?
            <img src={`data:image/jpeg;base64,${user?.profilePic}`} alt="" className="object-cover w-10 h-10 rounded-full"/> :
            <img src='/images/pp.png' alt="default img" className="w-12 h-12 object-cover rounded-full"/> 
          }
      </div>

      <div className='w-4/5 flex flex-col justify-center px-2'>
          <p className='font-bold'>{user?.firstName} {user?.lastName}</p>
          <p className='text-sm'>
            {truncateMessage(message?.messageContent)}
          </p>
      </div>
  </Link>
  )
}

export default DashboardMessageBox