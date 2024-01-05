import React from 'react'
import CustomInput from '../../common/CustomInput'
import CustomTextArea from '../../common/CustomTextArea'
import CustomComboBox from '../../common/CustomComboBox'

const ProfileInputBox = ({name, title, type, value, handleChange, options, isDescription = false }) => {
  
  return (
    <>
      <div className='flex flex-col md:flex-row py-5 '>
          <p className='text-sm font-bold md:w-1/5'>{title}</p>
          {
            isDescription ?
              <CustomTextArea name={name} type={type} value={value} handleChange={handleChange} /> :
              !options ? 
                <CustomInput name={name} type={type} value={value} handleChange={handleChange} /> :
                <CustomComboBox name={name} value={value} options={options} handleChange={handleChange}/>
          }
      </div>
      <hr className='text-white white'/>
    </>

  )
}

export default ProfileInputBox