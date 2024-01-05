import React from 'react'
import { useSelector } from 'react-redux';
import {Link} from 'react-router-dom';
import { selectUser } from '../../redux/store/userSlice';

const CourseCard = ({course}) => {

  const isTutor = useSelector(selectUser)?.role?.toLowerCase() === 'tutor';

  console.log('course:', course.tutor.profilePic);
  
  return (
    <Link to={`/courses/${course._id}`} className='w-72 h-72 sm:min-w-80 sm:max-w-80 sm:h-80 bg-gray cursor-pointer flex flex-col rounded-md'>
          <img
            src={course.coverPhoto ? course.coverPhoto : "images/default course cover.jpg"}
            alt="course cover"
            className='w-full h-3/5 object-cover rounded-t-md' 
          />
          <div className='pl-5 pt-2 h-full flex flex-col gap-y-3'>
              <p className='font-bold'>{course.courseName}</p>
              <p className='text-sm'>Level: <span className='font-semibold'>{course.level}</span></p>
              {
                isTutor ?
                <p className='text-sm'>
                  Students: {course.students.length}
                </p> :
                <>
                  <p className='text-sm'>Tutor: {course.tutor.firstName} {course.tutor.lastName}</p> 
                  {/* <img 
                    src={course.tutor.profilePic ? course.tutor.profilePic : '/images/pp.png'} 
                    alt="pp" 
                  /> */}
                </>
              
              }
              
          </div>

    </Link>
  )
}

export default CourseCard