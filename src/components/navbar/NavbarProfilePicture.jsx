import React, { useState } from 'react'
import PersonIcon from '@mui/icons-material/Person';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearUser, selectUser } from '../../redux/store/userSlice';
import { useLogOutMutation } from '../../redux/services/authSlice';

const NavbarProfilePicture = () => {

    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const isTutor = user?.role?.toLowerCase() === 'tutor'
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const navigate = useNavigate();
    const [logOut] = useLogOutMutation()

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

    const handleButtonClick = (buttonType) => {
        if (buttonType === 'Profile') {
            if (isTutor)
                navigate(`/tutors/${user._id}`)
            else 
                navigate(`/students/${user._id}`)
        }
        if (buttonType === 'Chats') {
            navigate(`/chats`)
        }
        if (buttonType === 'Log Out') {
            dispatch(clearUser())
            logOut();
            navigate('/home');
        }
        // Close the dropdown after button click
        setDropdownVisible(false);
      };

  return (
    <div className='relative flex justify-center'>

        <div className='h-10 w-10 cursor-pointer mx-auto'>
            {
            !user.profilePic? 
                <img 
                    src="/images/pp.png" 
                    alt="profile pic" 
                    className='h-full w-full object-cover rounded-full' 
                    onClick={toggleDropdown}
                /> :
                <img 
                    src={`data:image/jpeg;base64,${user.profilePic}`} 
                    alt="Preview" 
                    className='h-full w-full object-cover rounded-full' 
                    onClick={toggleDropdown}
                />
            }
            </div>

            {dropdownVisible && (
                <div className='absolute rounded-md w-24 z-10 flex flex-col' style={{top: '110%'}}>
                    <button onClick={() => handleButtonClick('Profile')} className='bg-gray text-xs w-full py-2 hover:bg-zinc-400 rounded-t-md'>
                        <span role="img" aria-label="icon1" className='mr-1 '>
                            <PersonIcon />
                        </span>
                        Profile
                    </button>
                    <button onClick={() => handleButtonClick('Chats')} className='bg-gray text-xs hover:bg-zinc-400 w-full py-2'>
                        <span role="img" aria-label="icon2" className='mr-2'>
                            <ChatBubbleIcon sx={{fontSize: 18}}/>
                        </span>
                        Chats
                    </button>
                    <button onClick={() => handleButtonClick('Log Out')} className='text-xs bg-gray rounded-b-md hover:bg-zinc-400 w-full py-2' style={{marginTop: 0.5}}>
                        <span role="img" aria-label="icon2" className='mr-2'>
                            <LogoutIcon sx={{fontSize: 18}}/>
                        </span>
                        Log Out
                    </button>
                </div>
            )}

    </div>

  )
}

export default NavbarProfilePicture