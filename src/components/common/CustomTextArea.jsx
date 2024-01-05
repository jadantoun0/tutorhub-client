import React from 'react'

const CustomTextArea = ({name, value, handleChange}) => {
  return (
    <textarea
        name={name}
        rows={3}
        value={value}
        onChange={handleChange}
        className='max-w-md md:w-4/5 pl-2 py-0.5 md:border-t md:border-b md:border-l md:border-r shadow-sm border-grey-300 rounded focus:outline-none focus:border-violet focus:border-1'
    />
  )
}

export default CustomTextArea