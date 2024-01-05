import React from 'react'

const CustomInput = ({key, name, value, type="text", handleChange, style={}}) => {
  return (
    <input 
      key={key}
      name={name}
      type={type} 
      value={value} 
      onChange={handleChange}
      style={style}
      className='max-w-md md:w-4/5 pl-2 h-8 md:border-t md:border-b md:border-l md:border-r shadow-sm border-grey-300 rounded focus:outline-none focus:border-violet focus:border-1 mx-auto'
    />
  )
}

export default CustomInput