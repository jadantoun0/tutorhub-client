import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import authService from '../services/authService';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/store/userSlice';
import WideButton from '../components/common/WideButton';
import { Link } from 'react-router-dom';

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMessage, setErrMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const signInUser = async (e) => {
    e.preventDefault();
    try {
        setIsLoading(true);
        const user = await authService.authenticate({email, password})
        console.log('user after login request: ', user);
        // update global state isLoggedIn
        dispatch(setUser(user));
        navigate("/dashboard");
    } catch(err) {
        console.log(err);
        setErrMessage(err.response?.data?.message)
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
              Sign in to your account
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

              {errMessage && <p className='text-red-500 text-center text-sm'>{errMessage}</p>}

              <WideButton text="Sign in" isLoading={isLoading} onClick={(e) => signInUser(e)}/>

              <p className="mt-3 text-center text-sm text-gray-500">
              Don't have an account?{' '}
              <Link to="/register" className="font-semibold leading-6 text-violet underline">
                Register
              </Link>
            </p>
          </form>
 
      </div>

  </div>
)
}

export default SignInPage;