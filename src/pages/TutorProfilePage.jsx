import React, { useState } from 'react'
import { useLocation, useParams } from 'react-router-dom';
import ViewTutorProfile from '../components/profile/parentComponents/ViewTutorProfile';
import EditTutorProfile from '../components/profile/parentComponents/EditTutorProfile';
import useFetch from '../hooks/useFetch';
import CustomLoadingSpinner from '../components/common/CustomLoadingSpinner';
import { useSelector } from 'react-redux';
import { selectUser } from '../redux/store/userSlice';

// this is like a mapper class that checkks whether user is visiting his own profile, and show components accordingly
const TutorProfilePage = () => {

  // user that we're entering his profile
  const { userId : visitedUserId} = useParams(); 
  const loggedInUser = useSelector(selectUser);

  // useLocation hook retrieves the current URL and its parameters
  const { search } = useLocation();
  // Parse the search string to get the query parameters
  const params = new URLSearchParams(search);
  // Get the value of the 'editMode' parameter, default to false
  const isEditMode = (params.get('editmode') === 'true') || false;


  // checking if user is visiting his own profile
  const isOwnProfile = loggedInUser?._id === visitedUserId;
  const [editMode, setEditMode] = useState(isEditMode);

  const {data : visitedUser, setData, isLoading, error} = useFetch(`/tutors/${visitedUserId}`)

  if (isLoading) return (
    <div className='flex justify-center'>
      <CustomLoadingSpinner />
    </div>
  )
        
  if (error) return <p>Error Fetching Data from the server</p>

  if (!isOwnProfile) 
    return <ViewTutorProfile user={visitedUser}  />

  else {
    return (
      editMode ?
        (<EditTutorProfile setEditMode={setEditMode} setTutor={setData} tutor={visitedUser}/>) :
        (<ViewTutorProfile isOwnProfile={true} setEditMode={setEditMode} user={visitedUser} />)
    )
  }

}

export default TutorProfilePage