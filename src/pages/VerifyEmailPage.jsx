import React, { useRef, useState } from 'react'
import { Alert } from '@mui/material';
import { useNavigate } from 'react-router';
import authService from '../services/authService';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/store/userSlice';
import WideButton from '../components/common/WideButton';

const VerifyEmail = () => {

  const email = localStorage.getItem('email');
  const [errMsg, setErrMsg] = useState("");
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("")
  const [num3, setNum3] = useState("")
  const [num4, setNum4] = useState("");

  const [vLoading, setVLoading] = useState(false);
  const [rLoading, setRLoading] = useState(false);

  const [isDisabled, setIsDisabled] = useState(false);
  const [errorAlert, setErrorAlert] = useState("");
  const [successAlert, setSuccessAlert] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // using ref to shift focus between the four inputs automatically
  const ref1 = useRef();
  const ref2 = useRef();
  const ref3 = useRef();
  const ref4 = useRef();

  const handleChange1 = (e) => {
    setNum1(e.target.value.charAt(0));
    if (e.target.value)
      ref2.current.focus();
  }

  const handleChange2 = (e) => {
    setNum2(e.target.value);
    if (e.target.value)
      ref3.current.focus();
    else
      ref1.current.focus();
  }

  const handleChange3 = (e) => {
    setNum3(e.target.value.charAt(0));
    if (e.target.value)
      ref4.current.focus();
    else
      ref2.current.focus();
 
  }

  const handleChange4 = (e) => {
      setNum4(e.target.value.charAt(0));
    if (!e.target.value) 
      ref3.current.focus();
    else
      ref3.current.blur();
  }


  const verifyOTP = async (e) => {
    e.preventDefault();

    const otpString = `${num1}${num2}${num3}${num4}`;

    if (!num1 || !num2 ||!num3 || !num4 || !otpString) {
      setErrMsg("Verification code must consist of 4 numbers.")
      return;
    }

    try {
      setVLoading(true);
      const user = await authService.verifyUser(email, otpString);
      localStorage.removeItem('email')
      dispatch(setUser(user));
    
      if (user.role.toLowerCase() === 'tutor')
        navigate(`/tutors/${user._id}?editmode=true`)
      else if (user.role.toLowerCase() === 'student')
        navigate(`/students/${user._id}?editmode=true`)
    } catch(err) {
      console.log(err);
      setErrMsg(err.response?.data?.message);
    } finally {
      setVLoading(false);
    }
  }


  const resendOTP = async (e) => {
    e.preventDefault();

    if (!isDisabled) {
      // disabling btn for next 60s
      setIsDisabled(true);
      try {
        setRLoading(true);
        await authService.resendOTP(email)
        showSuccessAlert();

      } catch(err){
        console.log(err);
        showErrorAlert();
      } finally {
        setRLoading(false);
      }
      // enabling button after 2mins
      setTimeout(() => {
        setIsDisabled(false);
      }, 120000)
    } 

    else {
      showErrorAlert();
    }
  }


  const showErrorAlert = () => {
     // if is disabled we show an alert
     setSuccessAlert("");
     setErrorAlert("Email may take time to be received. Please wait 2 minutes before requesting a new one.")
     // removing alert after 4s
     setTimeout(() => {
       setErrorAlert("")
     }, 3000)
  }


  const showSuccessAlert = () => {
    setErrorAlert("");
    setSuccessAlert(`Verification code resent to ${email}. It will be received within 30s.`);
     // removing alert after 4 seconds
    setTimeout(() => {
      setSuccessAlert("")
    }, 3000)
  }


  const formData = [
    {ref: ref1, value: num1, onChange: (e) => handleChange1(e), autoFocus: true},
    {ref: ref2, value: num2, onChange: (e) => handleChange2(e)},
    {ref: ref3, value: num3, onChange: (e) => handleChange3(e)},
    {ref: ref4, value: num4, onChange: (e) => handleChange4(e)},
  ]

  return (
    !email ?
      <h2 className='hy'>Please <a href='/register'>register</a> before verifying email.</h2> 
    :

    <div className='min-h-screen flex justify-center items-center'>
        {
          successAlert && <div className='fixed top-1'>
            <Alert variant="filled" severity="success">
              {successAlert}
            </Alert>
          </div>
        }
        {
          errorAlert && <div className='fixed top-1'>
            <Alert variant="filled" severity="error">
              {errorAlert}
            </Alert>
          </div>
        }


        <div className='w-full md:bg-gray px-20 pt-5 pb-10 sm:w-350 rounded-md'>
            <div>
              <img
                className="mx-auto h-20"
                src={"/images/logo/TutorHub Logo Horizontal.png"}
                alt="TutorHub"
              />
              <h2 className="text-center text-lg font-bold mt-3 leading-9 tracking-tight text-gray-900">
                Email Verification
              </h2>
            </div>

            <form className='max-w-xs mx-auto'>
                <div className='mt-3'>
                    <label htmlFor="email" className="text-sm font-medium leading-6 text-gray-900">
                        A verification code sent will be sent to <span className='text-black-500'>{email}</span> in a few minutes. Please enter it.
                    </label>
                    <div className='flex justify-center mt-3'>
                      {
                        formData.map(item => 
                          <input 
                            type="number" 
                            max={9}
                            ref={item.ref}
                            value={item.value} 
                            onChange={item.onChange} 
                            className='bg-transparent rounded-none w-8 h-8 text-center mx-2.5 border-solid border-b-2 border-violet focus:border-b-2.5 focus:outline-none' 
                          />
                        )
                      }    
                    </div>

                </div>
           
                {errMsg && <p className='text-red-500 mt-3 text-center text-sm'>{errMsg}</p>}
                <WideButton text="Verify" isLoading={vLoading}  onClick={(e)=> verifyOTP(e)} />
                <WideButton text="Resend Code" isLoading={rLoading} color="white" onClick={(e) => resendOTP(e)}/>
              
            </form>
        </div>
    </div>
  )
}

export default VerifyEmail