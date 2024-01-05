import React, { useRef, useState, useEffect } from 'react';
import socket from '../utils/socket';
import { useNavigate } from 'react-router-dom';
import MyButton from '../components/common/MyButton';
import { useSelector } from 'react-redux';
import { selectUser } from '../redux/store/userSlice';

const StartMeetingPage = () => {
  const roomRef = useRef();
  const [errMsg, setErrMsg] = useState('');
  const [err, setErr] = useState(false);
  const navigate = useNavigate();
  const loggedUser = useSelector(selectUser);
  const fullName = `${loggedUser.firstName} ${loggedUser.lastName}`

  useEffect(() => {
    socket.on('FE-error-user-exist', ({ error }) => {
      if (!error) {
        const roomName = 'any';
        const userName = fullName;

        sessionStorage.setItem('user', userName);
        navigate(`/room/${roomName}`);
      } else {
        setErr(true);
        setErrMsg('User name already exist');
      }
    });
  }, [navigate, loggedUser, fullName]);

  function clickJoin() {
    const roomName = 'any';
    const userName = fullName;

    if (!roomName || !userName) {
      setErr(true);
      setErrMsg('Enter Room Name or User Name');
    } else {
      socket.emit('BE-check-user', { roomId: roomName, userName });
    }
  }

  return (
    <div className='grid place-items-center mb-22' style={{height: "400px"}}>
        {/* <p className='font-bold text-lg mb-5'>Start Course</p> */}

        <div className='flex items-center gap-x-5' > 
          <label htmlFor="" className='font-semibold' >Enter Room Name</label>
          <input
            type="text"
            ref={roomRef}
            name="inputname"
            class="block w-56 rounded-md py-1.5 px-2"
            style={{border: "2px solid #592ACD"}}
          />
          <MyButton text="Start Meeting" onClick={() => clickJoin()}/>
        </div>
        {err && <p>{errMsg}</p>}
    </div>
  );
};

export default StartMeetingPage;
