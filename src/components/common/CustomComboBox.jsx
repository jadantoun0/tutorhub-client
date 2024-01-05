import React from 'react'

const CustomComboBox = ({name, value, options, handleChange, style={}}) => {

  return (
    <select 
        name={name}
        id=""
        value={value} 
        onChange={handleChange}
        className='max-w-md md:w-4/5 px-2 h-8 md:border-t md:border-b md:border-l md:border-r shadow-sm border-grey-300 rounded focus:outline-none focus:border-violet focus:border-1'
        style={style}
    >
        {!value && <option value="" selected disabled>Select an option</option>}
        {options.map(option => <option value={option.value}>{option.label}</option>)}
    </select>

  )
}

export default CustomComboBox