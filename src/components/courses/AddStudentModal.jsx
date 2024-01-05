import React, { useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import AddStudentBox from './AddStudentBox';
import MyButton from '../common/MyButton';
import { useGetAllStudentsQuery } from '../../redux/services/studentsSlice';
import CustomLoadingSpinner from '../common/CustomLoadingSpinner';
import { useAddStudentToCourseMutation } from '../../redux/services/courseSlice';

const AddStudentModal = ({handleClose, courseId, enrolledStudents}) => {
    const {data, isLoading, error} = useGetAllStudentsQuery();
    const [selectedStudents, setSelectedStudents] = useState([]);
    const students = data?.data;
    const [addStudentToCourse] = useAddStudentToCourseMutation();

    // Function to add a student to the selectedStudents array
    const addStudent = (student) => {
        setSelectedStudents([...selectedStudents, student]);
    };

    // function to check if a student is already enrolled
    function checkIsAlreadyEnrolled(studentId) {
        console.log(enrolledStudents);
        return enrolledStudents.some(student => student._id === studentId);
    }
    
    // Function to remove a student from the selectedStudents array
    const removeStudent = (student) => {
        const updatedStudents = selectedStudents.filter((s) => s !== student);
        setSelectedStudents(updatedStudents);
    };

    if (error) {
        return <p>An unexpected error occured</p>
    }

    if (isLoading) {
        return <CustomLoadingSpinner />
    }

    const addStudents = async () => {
        selectedStudents.forEach(async (student) => 
            await addStudentToCourse({courseId, studentId: student._id}));
        // clearing selected students array after adding them all
        setSelectedStudents([]);
        handleClose();
    }


  return (
    <div 
        className='rounded-md w-11/12 md:w-120 bg-gray p-3 md:p-5 absolute top-1/2 left-1/2' 
        style={{transform: 'translate(-50%, -50%)', height: "460px"}}>

        <div className='flex justify-end'>
            <CloseIcon sx={{fontSize: 20, cursor: "pointer"}} onClick={() => handleClose()}/>    
        </div>

        <p className='text-lg font-bold ml-5'>Add Students</p>
        <div className='overflow-y-scroll h-80'>
            {students.map(student => <AddStudentBox isAlreadyEnrolled={checkIsAlreadyEnrolled(student._id)} student={student} addStudent={addStudent} removeStudent={removeStudent}/>)}
        </div>
        <div className='flex justify-between mx-5 mt-3'>
            <p>{selectedStudents.length} selected</p>
            <MyButton text="Add Students" onClick={addStudents}/>
        </div>
    </div>

  )
}

export default AddStudentModal