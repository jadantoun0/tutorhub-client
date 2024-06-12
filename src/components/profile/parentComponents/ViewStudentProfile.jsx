import React from 'react'
import ProfileDataBox from '../childComponents/ProfileDataBox'
import CustomButton from '../../common/buttons/CustomButton'
import { capitalizeFirstLetter, formatDate, getCountryLabelByValue } from '../../../utils/global'
import { useSelector } from 'react-redux'
import { selectUser } from '../../../redux/store/userSlice'


const ViewStudentProfile = ({isOwnProfile, setEditMode, user}) => {

  const isTutor = useSelector(selectUser)?.type?.toLowerCase() === "tutor"

  const formData = [
    {title: "Educational Level" , content: capitalizeFirstLetter(user.educationalLevel)},
    {title: "Date of Birth" , content: formatDate(user.dateOfBirth)},
    {title: "Bio" , content: user.bio || ''},
    {title: "Nationality" , content: getCountryLabelByValue(user.nationality)},
    {title: "Language" , content: user.languages},
  ]  

  return (
    <div>

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
                  <p className='text-lg md:text-xl font-bold text-center'>{`${user.firstName || ""} ${user.lastName || ""}`}</p>
                  { 
                  !isOwnProfile && isTutor && 
                   <div className='flex gap-x-2'> 
                    <CustomButton text='Message'/>
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
            

        </div>
    </div>
  )
}

export default ViewStudentProfile