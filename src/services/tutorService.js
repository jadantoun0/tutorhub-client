import { axiosPrivate, http } from "../utils/http-common"

const updateTutor = async (tutor) => {
    const response = await axiosPrivate.put(`/tutors/${tutor._id}`, tutor);
    return response;
}

const getAllTutors = async () => {
    const response = await http.get('/tutors');
    return response.data;
}

const getTutorById = async (tutorId) => {
    const response = await axiosPrivate.get(`/tutors/${tutorId}`);
    return response.data;
}

const getAllSubjects = async () => {
    const response = await http.get('/tutors/subjects');
    return response.data;
}

const tutorService = {
    updateTutor,
    getAllSubjects,
    getAllTutors,
    getTutorById
}

export default tutorService