import React from 'react'
import CustomCalendar from '../components/schedule/CustomCalendar'
import BookingRequestBox from '../components/schedule/BookingRequestBox'
import AppointmentBox from '../components/schedule/AppointmentBox'
import { formatDateWithoutTime } from '../utils/global'
import { add, format } from 'date-fns'
import CustomLoadingSpinner from '../components/common/CustomLoadingSpinner'
import { useGetAppointmentsQuery, useGetPendingAppointmentsQuery } from '../redux/services/appointmentsSlice'
import { useSelector } from 'react-redux'
import { selectUser } from '../redux/store/userSlice'


const SchedulePage = () => {

  const {
    data: appointments, 
    isLoading: appointmentsIsLoading, 
    error: appointmentsError, 
  } = useGetAppointmentsQuery()


  const {
    data: appointmentRequests, 
    isLoading: appointRequestsIsLoading,
    error: appointRequestsError,
  } = useGetPendingAppointmentsQuery();

  console.log('appointments: ', appointments);

  // checking if logged  user is tutor
  const user = useSelector(selectUser);
  const isTutor = user?.role?.toLowerCase() === 'tutor';

  // function to group appointments per day
  const groupedAppointments = appointments?.reduce((acc, appointment) => {
    const dateKey = appointment.date.toISOString().split('T')[0]; // Group by date without time
  
    if (!acc[dateKey]) {
      acc[dateKey] = [appointment];
    } else {
      acc[dateKey].push(appointment);
    }
    return acc;
  }, {});


  if (appointmentsIsLoading || appointRequestsIsLoading) 
    return <CustomLoadingSpinner/>

  if (appointmentsError || appointRequestsError) return <p>An error occured</p>

  return (
    <div className='max-w-7xl mx-auto flex flex-col gap-y-4 px-5 md:px-20'>
        <h1 className='text-lg font-bold'>Schedule</h1>
        <CustomCalendar appointments={appointments} />       
        
        <div className='flex flex-col xl:flex-row gap-y-8 mt-14 justify-between items-start'>
          <main>
            <p className='font-bold mb-5'>Upcoming Appointments</p>
            <div className='flex flex-col gap-y-5'>
              {
                Object.entries(groupedAppointments).map(([dateKey, appointments]) => (
                  <div key={dateKey}>
                    <h2 className='font-bold'>{formatDateWithoutTime(dateKey)}</h2>
                    <div className='grid sm:grid-cols-2 gap-x-8 gap-y-4 mt-2'> 
                      {appointments.map((appointment, index) => 
                        <div key={index}>
                          <p>
                            {format((appointment.date), 'h:mm a')} 
                              - 
                            {format(add(appointment.date, { minutes: appointment.duration }), 'h:mm a')} 
                          </p>
                          <AppointmentBox appointment={appointment} />
                        </div>
                      )}
                    </div>
                  </div>
                ))
              }
            </div>
          </main>

          {
            isTutor &&
            <aside className='flex justify-end'>
              <div className='w-96 rounded-md flex flex-col items-center gap-y-3'>
                  <p className='w-full font-bold mb-2'>Appointment requests</p>
                  {
                    appointmentRequests.length === 0 ? 
                      <p className='w-full'>You have no incoming appointment requests</p> :
                    appointmentRequests.map((appointment => 
                      <BookingRequestBox appointment={appointment} />))
                  }
                </div>
            </aside>

          }

        </div>

    </div>
  )
}

export default SchedulePage