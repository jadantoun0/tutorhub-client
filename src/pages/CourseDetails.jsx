import React, { useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useAddFileToWeekMutation, useDeleteCouseMutation, useGetCourseByIdQuery, useRemoveStudentFromCourseMutation } from '../redux/services/courseSlice';
import CustomLoadingSpinner from '../components/common/CustomLoadingSpinner';
import WeekCard from '../components/courses/WeekCard';
import MyButton from '../components/common/MyButton';
import { uploadFile } from '../services/fileService';
import { useSelector } from 'react-redux';
import { selectUser } from '../redux/store/userSlice';
import { Modal } from '@mui/material';
import AddStudentModal from '../components/courses/AddStudentModal';
import EnrolledStudentBox from '../components/courses/EnrolledStudentBox';

const CourseDetails = () => {
  const { courseId } = useParams();
  const {data: course, isLoading, error} = useGetCourseByIdQuery(courseId);
  const [selectedCourse, setSelectedCourse] = useState(-1);
  const fileInputRef = useRef(null);
  const [addFileToWeek] = useAddFileToWeekMutation();
  const [deleteCourse] = useDeleteCouseMutation();
  const [removeStudent] = useRemoveStudentFromCourseMutation();
  const isTutor = useSelector(selectUser)?.role?.toLowerCase() === 'tutor'
  const navigate = useNavigate();
  
  const loggedUser = useSelector(selectUser);


  // states to handle modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openAddStudentsModal = () => setIsModalOpen(true)
  const closeAddStudentsModal = () => setIsModalOpen(false);

  // function to trigger file input on button click
  const handleUpload = () => {
    fileInputRef.current.click();
  };

  const handleAddStudent = () => {
    openAddStudentsModal();
  }

  const handleDeleteCourse = async () => {
    await deleteCourse(courseId);
    navigate('/courses')
  }

  const handleLeaveCourse = async () => {
    await removeStudent({courseId, studentId: loggedUser._id});
    navigate('/courses')
  }
 
   // function to handle file selection
  const handleFileChange = async (event) => {
    const selectedFile = event.target.files[0];
    // Add your logic to handle the selected file
    if (selectedFile) {
      try {
          // storing file document
          const formData = new FormData();
          formData.append('file', selectedFile);
          const filePath = await uploadFile(formData);
          // storing file in the db
          const weekNumber = selectedCourse < 0 ? 0 : selectedCourse;
          const body = {file: filePath}
          // await axiosPrivate.post(`/courses/${courseId}/addFile/${weekNumber}`, data );
          const data = {weekNumber, body, courseId};
          await addFileToWeek(data);
      } catch(err) {
          console.log(err);
      }
    }
  };

  if (error) {
    return <p>An unexpected error occured. Check your internet connection</p>
  }
  if (isLoading) {
    return <CustomLoadingSpinner /> 
  }
  return (
    <div className='max-w-7xl mx-auto '>
      <div className='mx-5 lg:mx-10 mt-5 '>
          {/* TOP */}
          <header className='flex justify-between'>
              <p className='font-bold text-xl'>{course.courseName}</p>
              <div className='flex gap-2'>
              <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: 'none' }}
                  onChange={handleFileChange}
              />
              { isTutor && (
                <>
                  <div className='hidden lg:block'>
                    <MyButton text="Add Student" color="gray" onClick={handleAddStudent}/>
                  </div>
                  <div>
                    <MyButton text="Upload File" onClick={handleUpload}/>
                  </div>
                </>
              )}
              </div>
          </header>

          <div className='flex flex-col lg:flex-row gap-4 items-start mt-10'>
            {/* LEFT */}
            <main className='w-11/12 lg:w-3/4 flex flex-col gap-0'>
                {
                    course?.documents.map((week, weekIndex) => 
                        <WeekCard 
                            courseId={courseId}
                            week={week} 
                            weekIndex={weekIndex} 
                            setSelectedCourse={setSelectedCourse}
                            selectedCourse={selectedCourse}
                        />)
                }
            </main>
            {/* RIGHT*/}
            <aside className='lg:ml-10'>
              
            <div className='flex justify-between'>
              <p className='font-bold'>{isTutor ? "Students" : "Tutor" }</p>
              <div className='block lg:hidden h-6 w-6 bg-violet text-white text-base rounded-full grid place-items-center'>
                {isTutor && <button onClick={handleAddStudent}>+</button>}
              </div>
            </div>
              {
                isTutor?
                  <div 
                    style={{boxShadow: 'rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px',}}
                    className='mt-2'
                  >
                    {course.students.map(student => <EnrolledStudentBox student={student}/>)}
                  </div> :
                  <div 
                    style={{boxShadow: 'rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px',}}
                    className='mt-2'>
                      <article   
                          className='flex items-center pl-5  gap-x-5 h-16 w-52'
                          style={{ borderBottom: "1px solid #ccc"}}
                        >   
                            <img 
                              src={course.tutor.profilePic ? course.tutor.profilePic : '/images/pp.png'} 
                              alt="pp" 
                              className='w-10 h-10 rounded-full' 
                            />
                            <p>{course.tutor.firstName} {course.tutor.lastName}</p>
                        </article>

                  </div>
              }
            </aside>
          
          </div>

          <div className='flex justify-center mt-5'>
            {isTutor ?
              <MyButton onClick={handleDeleteCourse} style={{backgroundColor: "red"}} text='Delete Course'/> :
              <MyButton onClick={handleLeaveCourse} style={{backgroundColor: "red"}} text='Leave Course'/> 
            }
          </div>

          <Modal open={isModalOpen} onClose={closeAddStudentsModal}>
            <AddStudentModal enrolledStudents={course.students} courseId={courseId} handleClose={closeAddStudentsModal} />
          </Modal>
        
      </div>

    </div>
  )
}

export default CourseDetails