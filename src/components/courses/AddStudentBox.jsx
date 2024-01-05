import { Checkbox } from '@mui/material'
import React from 'react'

const AddStudentBox = ({student, addStudent, removeStudent, isAlreadyEnrolled}) => {
    function handleCheck(event) {
       event.target.checked ? addStudent(student) : removeStudent(student);
    }

  return (
    <div className='mt-5 mx-5 flex items-center justify-between'>
        <div className='flex items-center gap-x-4'>
            <img src="/images/pp.png" alt="profile" className='h-10 w-10 rounded-full'/>
            <div>
                <p className='font-semibold text-lg'>{student.firstName} {student.lastName}</p>
                {isAlreadyEnrolled && <p className='text-sm italic'>Student is added</p>}
            </div>
        </div>
        { 
            !isAlreadyEnrolled && 
            <Checkbox 
             onChange={handleCheck}
             sx={{'&.Mui-checked': { color: '#592ACD'},
            }}/>
        }
       
    </div>
  )
}

export default AddStudentBox