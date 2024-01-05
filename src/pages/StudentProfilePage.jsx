import React, { useState } from 'react'
import { useLocation, useParams } from 'react-router-dom';
import ViewStudentProfile from '../components/profile/parentComponents/ViewStudentProfile'
import useFetch from '../hooks/useFetch';
import EditStudentProfile from '../components/profile/parentComponents/EditStudentProfile';
import CustomLoadingSpinner from '../components/common/CustomLoadingSpinner';
import { useSelector } from 'react-redux';
import { selectUser } from '../redux/store/userSlice';

const StudentProfilePage = () => {

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
  const isOwnProfile = loggedInUser._id === visitedUserId;
  const [editMode, setEditMode] = useState(isEditMode);

  const {data : visitedUser, setData, isLoading, error} = useFetch(`/students/${visitedUserId}`, {includeCookies: true})

  if (isLoading) 
    return <CustomLoadingSpinner/>
    
  if (error){
    console.log(error);
    return <p>Error Fetching Data from the server</p>
  } 
  if (!isOwnProfile) 
    return <ViewStudentProfile user={visitedUser}  />

  return (
    editMode ?
      <EditStudentProfile setEditMode={setEditMode} setStudent={setData} student={visitedUser}/> 
      : 
      <ViewStudentProfile isOwnProfile={true} setEditMode={setEditMode} user={visitedUser} /> 
  )

}

export default StudentProfilePage