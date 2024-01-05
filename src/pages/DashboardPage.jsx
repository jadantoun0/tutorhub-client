import React from 'react';
import { useGetCoursesQuery } from '../redux/services/courseSlice';
import { useGetAppointmentsQuery, useGetPendingAppointmentsQuery } from '../redux/services/appointmentsSlice';
import { useGetLatestMessagesQuery } from '../redux/services/messageSlice';
import CustomLoadingSpinner from '../components/common/CustomLoadingSpinner';
import { Link, useNavigate } from 'react-router-dom';
import CourseCard from '../components/courses/CourseCard';
import { formatDateWithoutTime } from '../utils/global';
import { add, format } from 'date-fns';
import AppointmentBox from '../components/schedule/AppointmentBox';
import BookingRequestBox from '../components/schedule/BookingRequestBox';
import DashboardMessageBox from '../components/dashboard/DashboardMessageBox';


const DashboardPage = () => {

  const {data: courses, isLoading: coursesLoding, error: coursesErr} = useGetCoursesQuery();
  const {data: appointments, isLoading: appLoading, error: appErr} = useGetAppointmentsQuery();
  const {data: appointmentRequests, isLoading: appReqLoading, error: appReqError} = useGetPendingAppointmentsQuery();
  const {data: latestMessages, isLoading: msgLoading, error: msgErr} = useGetLatestMessagesQuery();
  const navigate = useNavigate();
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


  if (coursesErr || appErr || appReqError || msgErr) {
    return <p>Error fetching data. Check your internet connection</p>
  }

  if (coursesLoding || appLoading || appReqLoading || msgLoading) {
    return <CustomLoadingSpinner />
  }
  
  return (
    <div className='mx-auto max-w-7xl'>
      <main className='flex flex-col justify-between xl:flex-row gap-y-10 mt-5 ml-10 md:ml-20 mr-5 lg:mr-20 xl:mr-0 '>
        <main className='xl:w-3/5'>
          {/* COURSES SECTION */}
          <section>
            <div className='flex justify-between'>
              <p className='font-bold'>Recently Accessed Courses</p>
              <Link to='/courses' className='text-violet text-sm underline'>See all</Link>
            </div>

            <div className='mt-8 flex flex-col gap-y-4 md:flex-row gap-x-10'>
              {/* retrieving first two courses and displaying them on the dashboard */}
            {
              courses.length === 0 ?
                <p>You're not enrolled in any course yet.</p> :
                courses.slice(0, 2).map((course, key) => <CourseCard key={key} course={course} />)
            }
            </div>
          </section>

          {/* APPOINTMENTS SECTION */}
          <section className='mt-10'>
            <div className='flex justify-between'>
              <p className='font-bold'>Upcoming Appointments</p>
              <Link to='/schedule' className='text-violet text-sm underline'>See all</Link>
            </div>

            <div className='mt-8'>
            {
              appointments.length === 0 ?
                <p>You don't have any upcoming appointment.</p> :
                <div className='flex flex-col items-start gap-y-5'>
                {
                  Object.entries(groupedAppointments).map(([dateKey, appointments]) => (
                    <div key={dateKey}>
                      <h2 className='font-semibold'>{formatDateWithoutTime(dateKey)}</h2>
                      <div className='grid sm:grid-cols-2 gap-y-4 gap-x-8 mt-2'> 
                        {appointments.map((appointment, key) => 
                          <div key={key}>
                            <p className='mb-2'>
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
            }
            </div>
          </section>

        </main>

        <aside className='xl:w-2/5 flex flex-col items-start xl:items-center gap-10'>
              {/* APPOINTMENT REQUESTS SECTION */}
              <section>
                <p className='font-bold'>Appointment Requests ({appointmentRequests.length})</p>
                {
                    appointmentRequests.length === 0 ? 
                      <p>You have no incoming appointment requests</p> :
                      <div className='mt-4'>
                        {
                          appointmentRequests.map((appointment => 
                            <BookingRequestBox appointment={appointment} />))
                        }
                      </div>
                }
              </section>

              {/* CHATS SECTION */}
              <section>
                <p className='font-bold mb-5'>Chats</p>
                {
                    /* CHAT BOX */
                    latestMessages.length === 0 ?
                      <p key="1">No chats yet</p> :
                      <>
                        {
                          latestMessages.slice(0, 3).map((message, key) => 
                            <DashboardMessageBox key={key} message={message} />
                          )
                        }
                        <div
                          onClick={() => navigate('/chats')}
                          className='bg-violet text-white w-full py-1 mt-3 rounded-md grid place-items-center cursor-pointer hover:opacity-90'>
                          <p className='text-sm'>See All</p>
                        </div>
                      </>
                } 
            
              </section>
        </aside>
      </main>

    </div>
  )
}

export default DashboardPage