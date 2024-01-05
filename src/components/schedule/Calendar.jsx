import { DateCalendar } from '@mui/x-date-pickers'
import React, { useState } from 'react'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'

const Calendar = () => {
    const [selectedDate, setSelectedDate] = useState(new Date())

  return (
      <div className='flex gap-x-20 justify-center'>
            <div className='w-80 '>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateCalendar 
                    value={selectedDate} 
                    onChange={(newValue) => setSelectedDate(newValue)}
                />
            </LocalizationProvider> 
            </div> 
            <div>
                <p className='text-2xl mb-10 font-bold text-center'>{selectedDate.toLocaleDateString()}</p>
                <p>hi</p>
            </div>
        </div>
    
  )
}

export default Calendar