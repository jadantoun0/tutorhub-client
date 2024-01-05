import { axiosPrivate } from "../utils/http-common"

const createAppointment = async (appointment) => {
    const response = await axiosPrivate.post('/appointments', appointment)
    return response.data;
}

const acceptAppointment = async (appointmentId) => {
    const response = await axiosPrivate.put(`/appointments/accept/${appointmentId}`);
    return response.data;
}

const deleteAppointment = async (appointmentId) => {
    const response = await axiosPrivate.delete(`/appointments/${appointmentId}`);
    return response.data;
}

const getAppointments = async () => {
    const response = await axiosPrivate.get(`/appointments`);
    return response.data;
}

const getPendingAppointments = async () => {
    const response = await axiosPrivate.get(`/appointments/pending`);
    return response.data;
}


const appointmentService = {
    createAppointment,
    acceptAppointment,
    getAppointments,
    getPendingAppointments,
    deleteAppointment
} 

export default appointmentService;