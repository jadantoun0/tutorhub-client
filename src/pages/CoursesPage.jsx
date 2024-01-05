import React, { useState } from 'react'
import CourseCard from '../components/courses/CourseCard'
import { Modal } from '@mui/material';
import CreateCourseModal from '../components/courses/CreateCourseModal';
import { useSelector } from 'react-redux';
import { selectUser } from '../redux/store/userSlice';
import { useGetCoursesQuery } from '../redux/services/courseSlice';
import CustomLoadingSpinner from '../components/common/CustomLoadingSpinner';

const CoursesPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {data: courses, isLoading, error} = useGetCoursesQuery();
  const isTutor = useSelector(selectUser)?.role?.toLowerCase() === 'tutor';
  
  // when user presses to book an appointment, we direct him to sign in if he is not
  const openCreateCourse = () => setIsModalOpen(true)
  const closeCreateCourse = () => setIsModalOpen(false);

  
  if (error) {
    return <p>An unexpected error occured</p>
  }
  if (isLoading) {
    return <CustomLoadingSpinner />
  }
  return (
    <div className='max-w-7xl mx-auto'>
      <div className=' mx-10 mt-5'>
        <div className='flex justify-between'>
          <h1 className='text-lg font-bold'>My Courses</h1>
          {/* Only tutors must have the option to add coourses */}
          {
            isTutor && 
            <button
              onClick={() => openCreateCourse()} 
              className='bg-violet h-8 w-8 text-xl rounded-full text-white hover:opacity-90'
            >
              +
            </button>
          }
        </div>

        <div className='mt-8 w-full justify-between grid place-items-center lg:grid-cols-2 xl:grid-cols-3 gap-10'>
          {
            courses.length === 0 ?
              <p>You're not enrolled in any course yet.</p> :
              courses.map(course => <CourseCard course={course} />)
          }
        </div>

        <Modal open={isModalOpen} onClose={closeCreateCourse}>
          <CreateCourseModal handleClose={closeCreateCourse} />
        </Modal>
        
      </div>

    </div>
  )
}

export default CoursesPage