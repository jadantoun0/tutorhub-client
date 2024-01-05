import { Fragment, useEffect, useState } from 'react';
import { Dialog, Disclosure, Popover, Transition } from '@headlessui/react'
import NavbarProfilePicture from './NavbarProfilePicture'
import tutorService from '../../services/tutorService';
import { capitalizeFirstLetter } from '../../utils/global';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/store/userSlice';


export default function Navbar() {
  // retrieving user from the redux store
  const user = useSelector(selectUser);

  const [subjects, setSubjects] = useState(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
  }, [])

  return (
    <header className="bg-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <img className="w-40" src="/images/logo/TutorHub Logo Horizontal.png" alt="TutorHub Logo" />
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            {/* <Bars3Icon className="h-6 w-6" aria-hidden="true" /> */}
          </button>
        </div>
        <Popover.Group className="hidden lg:flex lg:gap-x-12">

          {
            !user && 
            <Link to="/home" className={`text-sm font-semibold leading-6 text-gray-900 ${(page === 'home' || page === '') && 'border-b-2 border-violet'}`}>
              Home
            </Link>
          }

          {
            user && 
            <Link to="/dashboard" className={`text-sm font-semibold leading-6 text-gray-900 ${(page === 'dashboard') && 'border-b-2 border-violet'}`}>
              Dashboard
            </Link>
          }

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
            !user && 
            <Link to="/about" className={`text-sm font-semibold leading-6 text-gray-900 ${page === 'about' && 'border-b-2 border-violet'}`}>
              About
            </Link>
          }

          { 
            user && 
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


      <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="/subjects" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                className="h-12 w-auto"
                src="/images/logo/TutorHub Logo Horizontal.png"
                alt=""
              />
            </a>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              {/* <XMarkIcon className="h-6 w-6" aria-hidden="true" /> */}
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <Disclosure as="div" className="-mx-3">
                  {({ open }) => (
                    <>
                      <Disclosure.Button className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                        Subjects
                      </Disclosure.Button>
                    </>
                  )}
                </Disclosure>
                <a
                  href="/home"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Home
                </a>
        
                <a
                  href="/about"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  About
                </a>
              </div>
              <div className="py-6">
                <a
                  href="/login"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Log in
                </a>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  )
}
