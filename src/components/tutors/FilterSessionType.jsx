import { FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material'
import React from 'react'

const FilterSessionType = ({value, setValue, options}) => {
    
  return (
    <div className='flex flex-col gap-y-3'>
        <p className='font-semibold'>Choose Session Type</p>
      <FormControl> 
        <RadioGroup column="true" value={value} onChange={(e) => setValue(e.target.value)}>
            <FormControlLabel 
              value={'any'}
              control={<Radio sx={{ '&.Mui-checked': { color: '#592ACD'}}} />} 
              label={<span className="text-sm">Any</span>} 
            />
            {options.map((option, index) => 
               <FormControlLabel 
                  key={index}
                  value={option.value}
                  control={<Radio sx={{ '&.Mui-checked': { color: '#592ACD'}}} />} 
                  label={<span className="text-sm">{option.label}</span>} 
                />
            )}
        </RadioGroup>
    </FormControl>
    </div>

  )
}

export default FilterSessionType