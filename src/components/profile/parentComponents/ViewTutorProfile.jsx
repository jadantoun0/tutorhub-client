import React, { useState } from 'react'
import ProfileDataBox from '../childComponents/ProfileDataBox'
import CustomButton from '../../common/CustomButton'
import { calculateRating, capitalizeFirstLetter, getCountryLabelByValue } from '../../../utils/global'
import { Alert, Modal } from '@mui/material'
import BookSessionBox from '../childComponents/BookSessionBox'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectUser } from '../../../redux/store/userSlice'


const ViewTutorProfile = ({isOwnProfile, setEditMode, user}) => {

  const [successAlert, setSuccessAlert] = useState("");
  const navigate = useNavigate();
  const loggedUser = useSelector(selectUser);
  const isTutor = loggedUser?.type?.toLowerCase() === "tutor";

  const formData = [
    {title: "Bio" , content: user.bio},
    {title: "Education" , content: user.education},
    {title: "Nationality" , content: getCountryLabelByValue(user.nationality)},
    {title: "Language" , content: user.languages},
    {title: "Subject" , content: capitalizeFirstLetter(user.subject)},
    {title: "Skills" , content: user.skills},
    {title: "Position" , content: user.position},
    {title: "Session Type" , content: capitalizeFirstLetter(user.sessionType)},
    {title: "Hourly Rate ($)" , content: user.hourlyRate},
  ]

  if (user?.reviews?.length > 0) {
    formData.push([
      {title: "Rating", content: calculateRating(user.reviews)},
      {title: "Reviews", content: user.reviews}
    ])
  }


  const [isModalOpen, setIsModalOpen] = useState(false);

  // when user presses to book an appointment, we direct him to sign in if he is not
  const goToMessage = () => loggedUser? navigate(`/chats?user=${user._id}`) : navigate('/signin')
  const openBookSession = () => loggedUser ? setIsModalOpen(true) : navigate('/signin')
  const closeBookSession = () => setIsModalOpen(false);

  // when user presses to message a tutor, we direct him to sign in if he is not
  
  return (
    <div>
      {
          successAlert && <div className='fixed top-1 left-1/2'>
            <Alert variant="filled" severity="success">
              {successAlert}
            </Alert>
          </div>
        }

      { isOwnProfile ? 
          <h1 className='text-lg font-bold ml-10 md:ml-32'>My Profile</h1> :
          <h1 className='text-lg font-bold ml-10 md:ml-32'>Profiles</h1>     
      }

        <div className='bg-gray shadow-sm w-4/5 lg:w-3/5 max-w-4xl mx-auto mt-10 rounded-xl p-10 flex flex-col align-center'>
            
            <div className='flex flex-col md:flex-row gap-y-3 justify-center items-center gap-x-5'>
              {
                user.profilePic ?
                  <img src={`data:image/jpeg;base64,${user.profilePic}`} alt="Preview" className='w-20 h-20 object-cover rounded-full' />:
                  <img src="/images/pp.png" alt="profile pic" className='w-20 h-20 rounded-full object-cover' /> 
              }
                <div className='flex flex-col items-start gap-y-1'>
                  <p className='text-lg md:text-xl font-bold text-center'>{`${user.firstName || ''} ${user.lastName || ''}`}</p>
                  { 
                  !isOwnProfile && !isTutor &&
                   <div className='flex gap-x-2'> 
                    <CustomButton text='Book Session' color='secondary' onClick={openBookSession}/>
                    <CustomButton text='Message' onClick={goToMessage}/>
                   </div>
                  }
                </div>
            </div>

            <div className='mx-auto md:w-4/5 mt-8'>
      
              <hr className='text-white white'/>

              { formData.map(item => <ProfileDataBox title={item.title} content={item.content}/>)}

              <div className='flex justify-end mt-3'>
                 {isOwnProfile && <CustomButton onClick={() => setEditMode(true)} text='Edit'/>}
              </div>

            </div>

            <Modal open={isModalOpen} onClose={closeBookSession}>
              <BookSessionBox handleClose={closeBookSession} setSuccessAlert={setSuccessAlert} tutorId={user._id}/>
            </Modal>
         
        </div>
    </div>
  )
}

export default ViewTutorProfile