import React, { useState } from 'react'
import CustomInput from '../../common/CustomInput'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import CustomComboBox from '../../common/CustomComboBox'
import dayjs from 'dayjs';
import appointmentService from '../../../services/appointmentService';
import CloseIcon from '@mui/icons-material/Close';
import CustomButton from '../../common/buttons/CustomButton';

const BookSessionBox = ({setSuccessAlert, tutorId, handleClose}) => {

    const [type, setType] = useState('remote');
    const [duration, setDuration] = useState(60);
    const [course, setCourse] = useState("");
    const [appointmentDate, setAppointmentDate] = useState(dayjs());
    const [errMsg, setErrMsg] = useState("");

    const typeOptions = [
        {value: 'in-person', label: 'In-Person'},
        {value: 'remote', label: 'Remote'}
    ]
    
    const durationOptions = [
        {value: 30, label: '30 minutes'},
        {value: 45, label: '45 minutes'},
        {value: 60, label: '60 minutes'},
        {value: 90, label: '90 minutes'},
        {value: 120, label: '120 minutes'},
    ]

    const sendMeetingRequest = async () => {
        if (!course) {
            setErrMsg("Course should be specified")
            return;
        }
        try {
            const appointment = {tutorId, type, duration, courseName: course, date: appointmentDate.$d.toISOString()}
            await appointmentService.createAppointment(appointment);
            showSuccessAlert();
            handleClose();
        } catch(err) {
            console.log(err);
        } 
    }

    const showSuccessAlert = () => {
        setSuccessAlert(`Session request sent`);
            // removing alert after 4 seconds
        setTimeout(() => {
            setSuccessAlert("")
        }, 3000)
    }


  return (
    <div 
        className='h-96 rounded-md w-120 bg-gray p-5  absolute top-1/2 left-1/2' 
        style={{transform: 'translate(-50%, -50%)'}}>

        <div className='flex justify-end'>
            <CloseIcon sx={{fontSize: 20, cursor: "pointer"}} onClick={() => handleClose()}/>    
        </div>
        <p className='text-center text-lg font-bold'>Book a meeting</p>
    
    <div className='grid place-items-center'>

        <div className='flex flex-col justify-center px-auto gap-y-3 mt-5' style={{width: "350px"}}>
    
            <div>
                <p className='font-semibold text-sm'>Course</p>
                <CustomInput 
                    key="courseName"
                    name="course"
                    value={course} 
                    handleChange={(e) => setCourse(e.target.value)} 
                    style={{border: 0, width: "100%"}}
                />
            </div>


            <div>
                <p className='font-semibold text-sm'>Meeting Date and Time</p>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                    value={appointmentDate}
                    onChange={(newValue) => setAppointmentDate(newValue)}
                    sx={{
                        borderRadius: '5px',
                        padding: 0,
                        width: '100%', 
                        backgroundColor: 'white', 
                        '& .MuiInputBase-input': {
                            height: '8px', 
                        },
                    }}
                    />
                </LocalizationProvider>
            </div>

            <div className='flex justify-between'>
                <div style={{width: "150px"}}>
                    <p className='font-semibold text-sm'>Duration</p>
                    <CustomComboBox 
                        value={duration} 
                        handleChange={e => setDuration(e.target.value)} 
                        options={durationOptions}
                        style={{border: 0, width: "100%"}}
                    />
                </div>

                <div style={{width: "150px"}}>
                    <p className='font-semibold text-sm'>Session Type</p>
                    <CustomComboBox 
                        value={type} 
                        handleChange={e => setType(e.target.value)} 
                        options={typeOptions} 
                        style={{border: 0, width: "100%"}}
                    />
                </div>
            </div>

            <div className='flex justify-end mt-3'>
                <CustomButton text="Request meeting" onClick={sendMeetingRequest} />
            </div>
        </div>
        {errMsg && <p className='mt-2 text-sm text-red-500'>{errMsg}</p>}

        </div>
  </div>

  )
}

export default BookSessionBox