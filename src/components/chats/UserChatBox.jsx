import React from 'react'
import { fromISOtoTime } from '../../utils/dateUtils';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/store/userSlice';
import { truncateMessage } from '../../utils/messageUtils';

const UserChatBox = ({message, selectedUser, setSelectedUser}) => {

  // when user presses on a chat box, we update the selected user in the parent ChatPage 
  // component
  const changeSelectedUser = () => {
    setSelectedUser(user);
  }

  // retrieving from the message object the user that the logged user is chatting with
  const isTutor = useSelector(selectUser)?.role?.toLowerCase() === 'tutor';
  const user = isTutor ? message.student : message.tutor;
  const isSelected = selectedUser === user;


  return (
    <button
      onClick={changeSelectedUser}
      className={`w-full flex items-center px-3 py-2 text-sm transition duration-150 ease-in-out border-b border-borderColor cursor-pointer 
        ${isSelected && 'bg-gray'} focus:outline-none`}
    >
      <div className='flex w-full'>
        {
          !user.profilePic ?
              <img src="/images/pp.png" alt="profile pic" className='h-10 w-10 object-cover rounded-full' /> :
              <img src={`data:image/jpeg;base64,${user.profilePic}`} alt="" className='h-10 w-10 object-cover rounded-full' />
        }
        <div className='flex flex-1 items-left flex-col ml-2'>
          <div className="block flex items-left  font-semibold text-gray-600">
            {user.firstName} {user.lastName}
          </div>
          <p className='flex justify-left items-left'>
            {truncateMessage(message.messageContent)}
          </p>
        </div>
        <div>
          {fromISOtoTime(message.timestamp)}
        </div>
      </div>
    </button>

  )
}

export default UserChatBox