import  {BrowserRouter, Routes, Route} from 'react-router-dom';
import HomePage from './pages/HomePage';
import VerifyEmailPage from './pages/VerifyEmailPage';
import RegisterPage from './pages/RegisterPage';
import SignInPage from './pages/SigninPage';
import Footer from './components/footer/Footer';
import CheckFooter from './components/footer/CheckFooter';
import CheckNavbar from './components/navbar/CheckNavbar';
import AboutPage from './pages/AboutPage';
import TutorProfilePage from './pages/TutorProfilePage';
import StudentProfilePage from './pages/StudentProfilePage';
import TutorsPage from './pages/TutorsPage';
import SchedulePage from './pages/SchedulePage';
import ChatPage from './pages/ChatPage';
import CustomLoadingSpinner from './components/common/CustomLoadingSpinner';
import { useDispatch } from 'react-redux';
import CoursesPage from './pages/CoursesPage';
import CourseDetails from './pages/CourseDetails';
import DashboardPage from './pages/DashboardPage';
import StartMeetingPage from './pages/StartMeetingPage';
import RoomPage from './pages/RoomPage';
import { useEffect} from 'react';
import { useGetUserQuery } from './redux/services/authSlice';
import { setUser } from './redux/store/userSlice';
import Header from './components/navbar/Header';


function App() {
  const dispatch = useDispatch();
  const {data: user, isLoading} = useGetUserQuery();
  // storing the user as a global state accessible by all other components using redux

  useEffect(() => {
    // updating user in the redux store
    dispatch(setUser(user));
  }, [user, dispatch]);
 

  if (isLoading) {
    return <CustomLoadingSpinner/>
  }

  return (
    <div className='max-w-screen-3xl mx-auto'> 

        <BrowserRouter>
          {/* we check based on the page route whether to show header or not (if log in or register we dont show)*/}
          <CheckNavbar>
            <Header />
          </CheckNavbar>

          <Routes>
            <Route exact path='/signin' element={<SignInPage/>}/>
            <Route exact path='/verify' element={<VerifyEmailPage/>}/>
            <Route exact path='/register' element={<RegisterPage/>}/>
            <Route exact path="/" element={user ? <DashboardPage/> : <HomePage/>} />
            <Route exact path='/home' element={<HomePage/>} />
            <Route exact path='/about' element={<AboutPage/>} />
            <Route exact path='/dashboard' element={<DashboardPage/>} />
            <Route exact path='/chats' element={<ChatPage/>} />
            <Route exact path='/courses' element={<CoursesPage/>} />
            <Route exact path='/courses/:courseId' element={<CourseDetails/>} />
            <Route exact path='/tutors' element={<TutorsPage/>} />
            <Route exact path='/tutors/:userId' element={<TutorProfilePage/>} />
            <Route exact path='/students/:userId' element={<StudentProfilePage/>} />
            <Route exact path='/schedule' element={<SchedulePage/>} />
            <Route exact path='/meeting' element={<StartMeetingPage/>} />
            <Route exact path='/room/:roomId' element={<RoomPage/>} />
          </Routes>
          
          {/* we check based on the page route whether to show header or not */}
          <CheckFooter>
            <Footer />
          </CheckFooter>
        </BrowserRouter>

    </div>

  );

}

export default App;
