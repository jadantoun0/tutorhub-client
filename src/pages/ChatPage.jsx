import React, { useEffect, useState } from 'react';
import tutorService from '../services/tutorService';
import UserChatBox from '../components/chats/UserChatBox';
import ChatSpace from '../components/chats/ChatSpace';
import CustomLoadingSpinner from '../components/common/CustomLoadingSpinner';
import { useLocation } from 'react-router-dom';
import { useGetLatestMessagesQuery } from '../redux/services/messageSlice';
import studentService from '../services/studentService';
import { useSelector } from 'react-redux';
import { selectUser } from '../redux/store/userSlice';

const ChatPage = () => {

  // retrieving query parameters and checking if user exist
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const requestedUserId = params.get('user')

  // adding null checks so that if the user is not logged in, no error is thrown
  const user = useSelector(selectUser); // retrieving user from redux store
  const isTutor = user?.role?.toLowerCase() === 'tutor';

  const [selectedUser, setSelectedUser] = useState("");

  const {
    data: latestMessages, 
    isLoading: latestMessagesLoading,
    error: latestMessagesError
  } = useGetLatestMessagesQuery();


  // handling selected user (whose chat will be opened)
  useEffect(() => {
    // adjusting selected user
    const handleRequestedUser = async () => {
      // if user requested a user (entered a user profile to message him), we make him selected
      if (requestedUserId) {
        // user is tutor and entered a student profile
        if (isTutor) {
          const requestedUser = await studentService.getStudentById(requestedUserId);
          setSelectedUser(requestedUser);
        }
        // user is student and entered a tutor profile
        else {
          const requestedUser = await tutorService.getTutorById(requestedUserId);
          setSelectedUser(requestedUser);
        }
      }
      // if user did not request a user (did not enter a user profile), we make the latest message 
      // the selected user, in condition that there are messages
      else if (latestMessages?.length > 0) {
        if (isTutor)
          setSelectedUser(latestMessages[0].student);
        else 
          setSelectedUser(latestMessages[0].tutor)
      }
    }
    handleRequestedUser();
    
  }, [requestedUserId, isTutor, latestMessages]);


  if (latestMessagesError) {
    return <p>Error Occured</p>
  }
  if (latestMessagesLoading) {
    return <CustomLoadingSpinner/>
  }

  return (
    <div className="mt-5 mx-auto">
      <div className="min-w-full border bg-white border-borderColor rounded lg:grid lg:grid-cols-3">
        
        <div className="border-r border-borderColor lg:col-span-1">
          <div className="mx-3 my-3">
            <div className="relative text-gray-600">
              <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  viewBox="0 0 24 24" className="w-6 h-6 text-gray-300">
                  <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </span>
              <input className="block border-b-2 border-borderColor rounded-none w-full py-2 pl-10 outline-none" placeholder="Search"  />
            </div>
          </div>

          <ul className="overflow-auto h-[32rem] ml-4">
            <h2 className="my-2 mb-2 text-lg text-gray-600 font-bold">Chats</h2>
            <li>
                {
                  /* CHAT BOX */
                  latestMessages.length === 0 ?
                    <p>No chats yet</p> :
                    latestMessages.map(message => 
                      <UserChatBox 
                        key={message._id}
                        message={message} 
                        selectedUser={selectedUser} 
                        setSelectedUser={setSelectedUser}
                      />
                    )            
                } 

            </li>
          </ul>
        </div>

        {
          selectedUser &&
            <div className="hidden lg:col-span-2 lg:block">
              <div className="w-full">
                {/* CHAT HEADER WITH NAME */}
                <div className="relative flex items-center p-3 border-b border-borderColor ">
                  {  
                    !selectedUser.profilePic? 
                      <img src="/images/pp.png" alt="profile pic" className='h-10 w-10 object-cover rounded-full' /> :
                      <img src={`data:image/jpeg;base64,${selectedUser.profilePic}`} alt="Preview" className='h-10 w-10 object-cover rounded-full' />
                  }
                  <span className="block ml-2 font-bold text-gray-600">{selectedUser.firstName} {selectedUser.lastName}</span>
                </div>

                <ChatSpace selectedUser={selectedUser} isTutor={isTutor} /> 
              </div>
            </div>           
        }          
        
      </div>
    </div>
  );
}

export default ChatPage;
