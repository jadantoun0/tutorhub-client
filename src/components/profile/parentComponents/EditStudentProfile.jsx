import React, { useState } from 'react'
import ProfileInputBox from '../childComponents/ProfileInputBox';
import ProfilePictureInputBox from '../childComponents/ProfilePictureInputBox';
import CustomButton from '../../common/buttons/CustomButton';
import studentService from '../../../services/studentService';
import { EducationalLevelOptions } from '../../../utils/userDataEnumUtils';
import { countriesOptions, languagesOptions } from '../../../utils/comboBoxOptions';
import { formatDate } from '../../../utils/global';


const educationalLevelOptions = [
  { value: EducationalLevelOptions.ELEMENTARY_SCHOOL, label: 'Elementary School'},
  { value: EducationalLevelOptions.MIDDLE_SCHOOL, label: 'Middle School'},
  { value: EducationalLevelOptions.HIGH_SCHOOL, label: 'High School'},
  { value: EducationalLevelOptions.UNIVERSITY, label: 'University'},
]


const EditStudentProfile = ({student, setStudent, setEditMode}) => {

  const [errMsg, setErrMsg] = useState("")

  // to modify tutor object everytime user makes changes
  const handleInputChange = (event) => {
    const {name, value} = event.target;
    setStudent({ ...student, [name]: value})
  }

  // in jsx we will loop over this json object to create UI components for the form
  const formInputs = [
    {name: "firstName", title: "First Name", value: student?.firstName},
    {name: "lastName", title: "Last Name", value: student?.lastName},
    {name: "bio", title: "Bio", value: student?.bio, isDescription: true},
    {name: "nationality", title: "Nationality", value: student?.nationality, options: countriesOptions},
    {name: "languages", title: "Languages", value: student?.languages, options: languagesOptions},
    {name: "educationalLevel", title: "Educational Level", value: student?.educationalLevel, options: educationalLevelOptions},
    {name: "dateOfBirth", title: "Date of Birth", value: formatDate(student?.dateOfBirth), type: 'date'},
  ]
 
  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result.split(',')[1];
        setStudent({ ...student, [e.target.name]: base64String})
      };
      reader.readAsDataURL(file);
    }
  };

  const isFormValid = () => {
    const requiredFields = ['firstName', 'lastName', 'bio', 'educationalLevel', 'dateOfBirth', 'nationality', 'languages'];
    for (const field of requiredFields) {
      if (!student[field]) {
        return false;
      }
    }
    return true;
  };


  const saveUser = async () => {
    if (isFormValid()) {
      setErrMsg("")
      console.log('student is: ', student);
      try {
        await studentService.updateStudent(student);
        setEditMode(false)
      } catch(err) {
        setErrMsg(err.response?.data?.message)
      } 
    }
    else {
      setErrMsg("All required fields must be specified");
    }
  }


  return (  
    <div>
        <h1 className='text-lg font-bold ml-10 md:ml-32'>My Profile</h1>

        <div className='bg-gray shadow-sm w-4/5 lg:w-3/5 max-w-4xl mx-auto mt-10 rounded-xl p-10 flex flex-col align-center'>

            <ProfilePictureInputBox user={student} handleFileChange={handleFileChange} />

            <div className='mx-auto md:w-4/5 mt-8'>      
              <hr className=' text-white white'/>
              {
                formInputs.map(item =>
                    <ProfileInputBox 
                      name={item.name} 
                      title={item.title} 
                      type={item.type || 'text'}
                      value={item.value} 
                      options={item.options}
                      isDescription={item.isDescription || false} 
                      handleChange={handleInputChange}
                      date={item.date}
                    /> 
                ) 
              }

               <div className='flex justify-end mt-5'>
                <CustomButton onClick={() => saveUser()} text='Save'/>
              </div>

              {errMsg && <p className='text-center text-red-500'>{errMsg}</p>}
            </div>    
        </div>
    </div>
  )
}

export default EditStudentProfile