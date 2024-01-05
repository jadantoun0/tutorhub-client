import { axiosPrivate, http } from "../utils/http-common"

const authenticate = async (user) => {
    const response = await axiosPrivate.post("/auth/signin", user);
    return response.data;
}

const register = async (user) => {
    const response = await http.post("/auth/register", user);
    return response.data;
}


const verifyUser = async (email, otp) => {
    const response = await axiosPrivate.post("/auth/verify", {email, otp})
    return response.data  
}

const resendOTP = async (email) => {
  return http.post('/auth/resendotp', { email });
};

const authService = {
    authenticate,
    verifyUser,
    resendOTP,
    register
}

export default authService