import React from 'react'
import MultiRangeSlider from '../../externalComponents/multiRangeSlider/MultiRangeSlider'

const FilterPriceRange = ({setValue}) => {
  return (
    <div className='flex flex-col gap-y-3'>
        <p className='mb-2 font-semibold'>Session Price Range</p>
        <MultiRangeSlider
              min={0}
              max={500}
              onChange={({ min, max }) => setValue({min, max})}
          />
    </div>
  )
}

export default FilterPriceRange