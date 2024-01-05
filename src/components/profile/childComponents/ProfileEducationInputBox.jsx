import React from 'react'
import CustomInput from '../../common/CustomInput'
import { IconButton, Tooltip } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';


const ProfileEducationInputBox = ({name, title, value, tutor, setTutor}) => {    

    const addEducation = () => setTutor({...tutor, education: [...tutor.education, ""]})
    const addSkill = () => setTutor({...tutor, skills: [...tutor.skills, ""]})

    const handleEducationChange = (index, value) => {
        setTutor({...tutor, education: tutor.education.map((edu, i) => i === index ? value : edu)});
    }

    const handleEducationDelete = (index) => {
        setTutor({...tutor, education: tutor.education.filter((edu, i) => i !== index)});
    }
    
    const handleSkillChange = (index, value) => {
        setTutor({...tutor, skills: tutor.skills.map((edu, i) => i === index ? value : edu)});
    }

    const handleSkillDelete = (index) => {
        setTutor({...tutor, skills: tutor.skills.filter((edu, i) => i !== index)});
    }
    
    const handleChange = (index, e) => {
        if (name === 'skills') 
            handleSkillChange(index, e.target.value)
        else if (name === 'education') 
            handleEducationChange(index, e.target.value)
    } 

    const handleDelete = (index) => {
        if (name === 'skills') 
            handleSkillDelete(index);
        else if (name === 'education') 
            handleEducationDelete(index);
    }

    const add = () => {
        if (name === 'skills') 
            addSkill();
        else if (name === 'education') 
            addEducation();
    }

  return (
    <>
        <div className='flex flex-col md:flex-row py-5 items-top'>
            <p className='text-sm font-bold md:w-1/5'>{title}</p>
            <div className='flex flex-col gap-y-2 md:w-4/5'>
                { 
                value.map((item, index) => 
                <div className='flex items-center gap-x-2'>
                    <CustomInput 
                        key={index} 
                        title={title} 
                        value={item} 
                        handleChange={(e) => handleChange(index, e)}
                    />
                    { index > 0 && <IconButton onClick={() => handleDelete(index)}><DeleteIcon/></IconButton>}
                </div>
                    
                )
                }
            </div>

            <Tooltip title="Add">
                <button 
                    className='bg-violet flex items-center justify-center text-white h-6 w-6 text-lg rounded-full' 
                    onClick={() => add()}>
                        +
                </button>
            </Tooltip>
        
        </div>
        <hr className='text-white white'/>
    </>

  )
}

export default ProfileEducationInputBox