import React, {useState} from 'react'
import { FormControl } from '@mui/base';
import { FormControlLabel, Radio, RadioGroup } from '@mui/material';
import { useNavigate } from 'react-router';
import authService from '../services/authService';
import WideButton from '../components/common/WideButton';
import { Link } from 'react-router-dom';

const RegisterPage = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [role, setRole] = useState('student');
  const [errMessage, setErrMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const registerUser = async (e) => {
    e.preventDefault();

    if (!email || !password || !confirmPass) {
        setErrMessage("All required fields must be specified.");
        return;
    }

    if (password !== confirmPass) {
        setErrMessage("Passwords do not match.");
        return;
    }

    try {
        setIsLoading(true);
        const user = await authService.register({email, password, role});
        setErrMessage("");
        localStorage.setItem("email", user.email);
        navigate(`/verify`);
    } catch(err) {
        console.log(err);
        setErrMessage(err.response?.data?.message);
    } finally {
        setIsLoading(false);
    }
  }

  return (
    <div className='min-h-screen flex justify-center items-center'>
        <div className='w-full md:bg-gray px-20 pt-5 pb-10 sm:w-350 rounded-md'>
            <div>
              <img
                className="mx-auto h-20"
                src={"/images/logo/TutorHub Logo Horizontal.png"}
                alt="TutorHub"
              />
              <h2 className="text-center text-lg font-bold mt-3 leading-9 tracking-tight text-gray-900">
                Create an account
              </h2>
            </div>

            <form className='max-w-xs mx-auto'>
                <div className='mt-3'>
                    <label htmlFor="email" className="text-sm font-medium leading-6 text-gray-900">
                        Email address
                    </label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full text-sm rounded-md py-1.5 px-2 text-gray-900 shadow-sm border border-violet sm:leading-6 focus:border-violet active:border-violet active:border-2 focus:border-2 outline-none"
                    /> 
                </div>
               
                <div className='mt-3'>
                    <label htmlFor="email" className="text-sm font-medium leading-6 text-gray-900">
                        Password
                    </label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full text-sm rounded-md py-1.5 px-2  text-gray-900 shadow-sm border border-violet sm:leading-6 focus:border-violet active:border-violet active:border-2 focus:border-2 outline-none"
                    /> 
                </div>
               
                <div className='mt-3'>
                    <label htmlFor="confirmPass" className="text-sm font-medium leading-6 text-gray-900">
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        value={confirmPass}
                        onChange={(e) => setConfirmPass(e.target.value)}
                        required
                        className="w-full text-sm rounded-md py-1.5 px-2 text-gray-900 shadow-sm border border-violet sm:leading-6 focus:border-violet active:border-violet active:border-2 focus:border-2 outline-none"
                    /> 
                </div>
               
                <div className='mt-3'>

                    <FormControl>
                        <label className="text-sm font-medium leading-6 text-gray-900">
                            Role
                        </label>  
                        <RadioGroup row value={role} onChange={(e) => setRole(e.target.value)}>
                            <FormControlLabel 
                                value="student" 
                                control={<Radio sx={{ '&.Mui-checked': { color: '#592ACD'}}} />} 
                                label={<span className="text-sm">Student</span>} 
                                sx={{marginRight: "50px"}}
                            />
                            <FormControlLabel 
                                value="tutor" 
                                control={<Radio sx={{ '&.Mui-checked': { color: '#592ACD'}}} />}  
                                label={<span className="text-sm">Tutor</span>} 
                            />
                        </RadioGroup>
                    </FormControl>
                
                </div>

                {errMessage && <p className='text-red-500 text-center text-sm'>{errMessage}</p>}

                <WideButton text="Create" isLoading={isLoading} onClick={(e) => registerUser(e)}/>

                <p className="mt-3 text-center text-sm text-gray-500">
                    Already have an account?{' '}
                <Link to="/signin" className="font-semibold leading-6 text-violet underline">
                  Sign in
                </Link>
              </p>
            </form>

        </div>

    </div>
  )

}

export default RegisterPage;