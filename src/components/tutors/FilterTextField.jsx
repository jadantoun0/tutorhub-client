import React from 'react'
import { capitalizeFirstLetter } from '../../utils/global'

const FilterTextField = ({title, value, setValue, options}) => {
  return (
    <div>
        <p className='mb-2 font-semibold'>{title}</p>
        <select value={value} onChange={(e) => setValue(e.target.value)} className='w-40 outline-none bg-gray h-8 rounded-md px-2'>
            <option value="any">Any</option>
            {options?.map((option, index) => 
              <option key={index} value={option}>
                {capitalizeFirstLetter(option)}
              </option>)
            }
        </select>
    </div>

  )
}

export default FilterTextField