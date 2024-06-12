import React, { useRef, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import { EducationalLevelOptions } from '../../utils/userDataEnumUtils';
import CustomInput from '../common/CustomInput';
import CustomComboBox from '../common/CustomComboBox';
import { uploadFile } from '../../services/fileService';
import { useCreateCourseMutation } from '../../redux/services/courseSlice';
import CustomButton from '../common/buttons/CustomButton';

const CreateCourseModal = ({handleClose}) => {

    const [courseName, setCourseName] = useState("");
    const [level, setLevel] = useState(EducationalLevelOptions.UNIVERSITY);
    const [coverPhoto, setCoverPhoto] = useState("");
    const [errMsg, setErrMsg] = useState("")
    const [createCourse] = useCreateCourseMutation();

    const courseLevelOptions = [
        {value: EducationalLevelOptions.ELEMENTARY_SCHOOL, label: 'Elementary School'},
        {value: EducationalLevelOptions.MIDDLE_SCHOOL, label: 'Middle School'},
        {value: EducationalLevelOptions.HIGH_SCHOOL, label: 'High School'},
        {value: EducationalLevelOptions.UNIVERSITY, label: 'University'},
    ]
    
    const handleCreateCourse = async () => {
        if (!courseName || !level) {
            setErrMsg("Course name and level should be specified")
            return;
        }
        try {
            const course = {courseName, level, coverPhoto };
            await createCourse(course).unwrap();
            handleClose();
        } catch(err) {
            console.log(err);
            setErrMsg(err?.data?.message);
        }
    }

    const fileInputRef = useRef(null);

    // function to open input dialog when user presses on 'change cover' button
    const changeCoverPhoto = () => {
        fileInputRef.current.click();
    };

    // function to store the image chosen by the user in a variable
    const handleFileChange = async (e) => {
        const selectedFile = e.target.files[0];
        // if the selected file is an image, store it in the variable
        if (selectedFile?.type?.startsWith('image/')) {
            try {
                const formData = new FormData();
                formData.append('file', selectedFile);
                const filePath = await uploadFile(formData);
                setCoverPhoto(filePath)
            } catch(err) {
                console.log(err);
            }
        }
    };

  return (
    <div 
        className='rounded-md w-11/12 md:w-120 bg-gray p-5  absolute top-1/2 left-1/2' 
        style={{transform: 'translate(-50%, -50%)', height: "460px"}}>

        <div className='flex justify-end'>
            <CloseIcon sx={{fontSize: 20, cursor: "pointer"}} onClick={() => handleClose()}/>    
        </div>
        <p className='ml-2 md:ml-10 text-lg font-bold'>Create Course</p>
    
        <div className='grid place-items-center px-5 lg:px-10'>

            <div className='flex flex-col justify-center px-auto gap-y-3 mt-5 w-full'>
                {/* COURSE IMAGE */}
                <div className='flex justify-center'>
                    {
                        coverPhoto ?
                        <img src={coverPhoto} alt="no profile pic" className='w-20 h-20 rounded-full object-cover'/> :
                        <img src="images/default course cover.jpg" alt="no profile pic" className='w-20 h-20 rounded-full object-cover'/> 
                    }
                </div>

                <div className='flex justify-center'>
                    <CustomButton text="Change cover" color="white" onClick={changeCoverPhoto}/>
                </div>
                {/* INVISIVLE INPUT TO OPEN FILE INPUT DIALOG */}
                <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                />
                {/* COURSE NAME*/}
                <div>
                    <p className='font-semibold text-sm'>Course Name</p>
                    <CustomInput 
                        value={courseName} 
                        handleChange={(e) => setCourseName(e.target.value)} 
                        style={{border: 0, width: "100%"}}
                    />
                </div>
                {/* COURSE LEVEL */}
                <div>
                    <p className='font-semibold text-sm'>Level</p>
                    <CustomComboBox 
                        value={level} 
                        handleChange={e => setLevel(e.target.value)} 
                        options={courseLevelOptions}
                        style={{border: 0, width: "100%"}}
                    />
                </div>

                <div className='flex justify-end mt-3'>
                    <CustomButton text="Create Course" onClick={handleCreateCourse}/>
                </div>
            </div>
            {errMsg && <p className='mt-2 text-red-500'>{errMsg}</p>}

            </div>
        </div>

  )
}

export default CreateCourseModal