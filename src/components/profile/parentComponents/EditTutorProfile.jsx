import React, { useState } from 'react'
import ProfileInputBox from '../childComponents/ProfileInputBox';
import ProfileEducationInputBox from '../childComponents/ProfileEducationInputBox';
import ProfilePictureInputBox from '../childComponents/ProfilePictureInputBox';
import tutorService from '../../../services/tutorService'
import CustomButton from '../../common/buttons/CustomButton';
import { SessionTypeOptions } from '../../../utils/userDataEnumUtils';
import { countriesOptions, languagesOptions, subjectOptions } from '../../../utils/comboBoxOptions';
import { useDispatch } from 'react-redux';
import { setUser } from '../../../redux/store/userSlice';


const sessionTypeOptions = [
  { value: SessionTypeOptions.IN_PERSON, label: 'In-Person'},
  { value: SessionTypeOptions.REMOTE, label: 'Remote'},
  { value: SessionTypeOptions.REMOTE_OR_IN_PERSON, label: 'Remote or In-Person'},
]


const EditTutorProfile = ({tutor, setTutor, setEditMode}) => {

  const [errMsg, setErrMsg] = useState("");
  const dispatch = useDispatch();

  // to modify tutor object everytime user makes changes
  const handleInputChange = (event) => {
    const {name, value} = event.target;
    setTutor({ ...tutor, [name]: value})
  }

  // in jsx we will loop over this json object to create UI components for the form
  const formInputs = [
    { name: "firstName", title: "First Name", value: tutor?.firstName, required: true },
    { name: "lastName", title: "Last Name", value: tutor?.lastName, required: true },
    { name: "bio", title: "Bio", value: tutor?.bio, isDescription: true, required: true },
    { name: "subject", title: "Subject", value: tutor?.subject, options: subjectOptions, required: true },
    { name: "skills", title: "Skills", value: tutor?.skills, required: true },
    { name: "position", title: "Position", value: tutor?.position },
    { name: "education", title: "Education", value: tutor?.education, required: true },
    { name: "hourlyRate", title: "Hourly Rate ($)", value: tutor?.hourlyRate || 0, type: 'number', required: true },
    { name: "sessionType", title: "Session Type", value: tutor?.sessionType, options: sessionTypeOptions, required: true },
    { name: "nationality", title: "Nationality", value: tutor?.nationality, options: countriesOptions, required: true },
    { name: "languages", title: "Languages", value: tutor?.languages, options: languagesOptions, required: true },
  ];
 
  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result.split(',')[1];
        setTutor({ ...tutor, [e.target.name]: base64String})
      };
      reader.readAsDataURL(file);
    }
  };

  const isFormValid = () => {
    for (const item of formInputs) {
      if (item.required && !tutor[item.name]) {
        return false;
      }
    }
    return true;
  };


  const saveUser = async () => {
    if (isFormValid()) {
      setErrMsg("")
      const res = await tutorService.updateTutor(tutor);
      setEditMode(false);
      dispatch(setUser(res.data));
    }
    else {
      setErrMsg("All required fields must be specified");
    }
  }


  return (  
    <div>
        <h1 className='text-lg font-bold ml-10 md:ml-32'>My Profile</h1>

        <div className='bg-gray shadow-sm w-4/5 lg:w-3/5 max-w-4xl mx-auto mt-10 rounded-xl p-10 flex flex-col align-center'>

            <ProfilePictureInputBox user={tutor} handleFileChange={handleFileChange} />

            <div className='mx-auto md:w-4/5 mt-8'>      
              <hr className=' text-white white'/>
              {
                formInputs.map(item =>
                  item.name === 'education' || item.name === 'skills' ?
                    <ProfileEducationInputBox
                      name={item.name}
                      title={item.title}
                      value={item.value}
                      tutor={tutor}
                      setTutor={setTutor}
                    /> :
          
                    <ProfileInputBox 
                      name={item.name} 
                      title={item.title} 
                      type={item.type || 'text'}
                      value={item.value} 
                      options={item.options}
                      isDescription={item.isDescription || false} 
                      handleChange={handleInputChange}
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

export default EditTutorProfile