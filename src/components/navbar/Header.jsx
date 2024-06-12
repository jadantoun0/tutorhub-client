import { Fragment, useEffect, useState } from 'react';
import { Dialog, Disclosure, Popover, Transition } from '@headlessui/react'
import NavbarProfilePicture from './NavbarProfilePicture'
import tutorService from '../../services/tutorService';
import { capitalizeFirstLetter } from '../../utils/global';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearUser, selectUser } from '../../redux/store/userSlice';
import { useLogOutMutation } from '../../redux/services/authSlice';
import MenuButton from './MenuButton';
import DashboardIcon from '@mui/icons-material/Dashboard';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import MarkChatUnreadIcon from '@mui/icons-material/MarkChatUnread';
import PersonIcon from '@mui/icons-material/Person';

export default function Header() {
  // retrieving user from the redux store
  const user = useSelector(selectUser);

  const [subjects, setSubjects] = useState(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [logOut] = useLogOutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const location = useLocation();
  const pathname = location.pathname;
  // Extract the 'schedule' from the pathname
  const page = pathname.substring(1); 

  useEffect(() => {
    const retrieveSubjects = async () => {
      try {
        const response = await tutorService.getAllSubjects();
        setSubjects(response);
      } catch(err) {
        console.log(err);
      }
    }
    retrieveSubjects();
  }, []);

  // handle log out 
  const handleLogOut = () => {
    dispatch(clearUser())
    logOut();
    setMobileMenuOpen(false)
    navigate('/home');
  }

  return (
    <header className="bg-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        {/* LOGO */}
        <div className="flex lg:flex-1">
          <img className="w-40" src="/images/logo/TutorHub Logo Horizontal.png" alt="TutorHub Logo" />
        </div>
        {/* MOBILE */}
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            {/* MENU BUTTON */}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        </div>
        {/* MENU ITEMS FOR LARGE SCREENS  */}
        <Popover.Group className="hidden lg:flex lg:gap-x-12">

          {
            !user ? 
              <Link to="/home" className={`text-sm font-semibold leading-6 text-gray-900 ${(page === 'home' || page === '') && 'border-b-2 border-violet'}`}>
                Home
              </Link>
              :
              <Link to="/dashboard" className={`text-sm font-semibold leading-6 text-gray-900 ${(page === 'dashboard') && 'border-b-2 border-violet'}`}>
                Dashboard
              </Link>
          }

          {/* POP OVER FOR SUBJECTS */}
          <Popover className="relative">
            <Popover.Button className={`flex outline-none items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900`}>
              <span className={`${page === 'tutors' && 'border-b-2 border-violet'}`}>
                Subjects
              </span>
              <svg className="h-5 w-5 flex-none text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
              </svg>
            </Popover.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute -left-8 top-full z-10 py-3 shadow-xl mt-3 w-64 rounded-lg bg-gray shadow-lg">
                <div className="flex flex-col">
                  {subjects?.map((subject, index) => (
                    <a key={index } href={`/tutors?subject=${subject}`} className='cursor-pointer px-5 py-1  bg-gray hover:bg-zinc-400'>
                      {capitalizeFirstLetter(subject)}
                    </a>
                  ))}
                </div>
  
              </Popover.Panel>
            </Transition>
          </Popover>
        
          { 
            !user ?
            <Link to="/about" className={`text-sm font-semibold leading-6 text-gray-900 ${page === 'about' && 'border-b-2 border-violet'}`}>
               About
            </Link>
            :
              <>
              <Link to="/courses" className={`text-sm font-semibold leading-6 text-gray-900 ${(page === 'courses') && 'border-b-2 border-violet'}`}>
                My Courses
              </Link>
              <Link to="/schedule" className={`text-sm font-semibold leading-6 text-gray-900 ${page === 'schedule' && 'border-b-2 border-violet'}`}>
              Schedule
            </Link>
            </>
          }

          { 
            user && user?.role.toLowerCase() === 'tutor' ?
              <Link to="/meeting" className="text-sm font-semibold leading-6 text-gray-900">
                Start Meeting
              </Link> :
              user && 
              <Link to="/meeting" className="text-sm font-semibold leading-6 text-gray-900">
                Join Meeting
              </Link> 
          }

        </Popover.Group>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {
            !user ?
              <Link to="/signin" className="bg-violet text-white rounded-2xl px-4 py-1  text-sm font-semibold leading-6 hover:opacity-90">
                Sign in <span aria-hidden="true">&rarr;</span>
              </Link> :
              <NavbarProfilePicture />
          }
        </div> 

      </nav>


      {/* DIALOG FOR SMALL SCREENS */}
      <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-10 bg-black opacity-30" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm ">
          <div className="grid items-center justify-items-end">
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="mt-2 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">

                {
                  !user ?
                    <MenuButton text="Home" url="/home"/>
                    :
                    <MenuButton text="Dashboard" url="/dashboard" icon={() => <DashboardIcon/>}/>
                }
                
                <Disclosure as="div" className="-mx-3">
                {() => (
                  <>
                    <Disclosure.Button className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 md:hover:bg-gray">
                      Subjects
                    </Disclosure.Button>
                  </>
                )}
              </Disclosure>

                {
                  !user ? 
                  <MenuButton text="About" url="/about"/>
                  :
                  <>
                    <MenuButton text="My Courses" url="/courses" icon={() => 
                      <svg className='w-5' viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M0 219.2v212.5c0 14.25 11.62 26.25 26.5 27C75.32 461.2 180.2 471.3 240 511.9V245.2C181.4 205.5 79.99 194.8 29.84 192C13.59 191.1 0 203.6 0 219.2zM482.2 192c-50.09 2.848-151.3 13.47-209.1 53.09C272.1 245.2 272 245.3 272 245.5v266.5c60.04-40.39 164.7-50.76 213.5-53.28C500.4 457.9 512 445.9 512 431.7V219.2C512 203.6 498.4 191.1 482.2 192zM352 96c0-53-43-96-96-96S160 43 160 96s43 96 96 96S352 149 352 96z"/></svg>
                    }/>
                    <MenuButton text="Schedule" url="/schedule" icon={() => <WatchLaterIcon/>}/>
                  </>
                }

                {
                   user && user?.role.toLowerCase() === 'tutor' ? 
                    <MenuButton text="Start Meeting" url="/meeting" icon={() => <VideoCallIcon />}/>
                  :
                  user &&
                    <MenuButton text="Join Meeting" url="/meeting" icon={() => <VideoCallIcon />}/>
                }

                {
                  user && 
                  <>
                    <MenuButton text="Chats" url="/chats" icon={() => <MarkChatUnreadIcon />}/>

                    {
                      user.role.toLowerCase() === 'tutor' ?
                       <MenuButton text="Profile" url={`/tutors/${user._id}`} icon={() => <PersonIcon/>}/>
                      :
                      <MenuButton text="Profile" url={`/students/${user.id}`} icon={() => <PersonIcon />} />
                    }
                  </>
                }
        
              </div>
              {/*  UNDER THE LINE */}
              <div className="py-6">
                {
                  !user ?
                    <MenuButton text="Sign in" url="/signin"/>
                  :
                  <p
                    onClick={() => handleLogOut()}
                    className="-mx-3 block cursor-pointer rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-red-500 sm:hover:bg-gray"
                  >
                    Log out
                  </p> 
                } 
            
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  )
}
