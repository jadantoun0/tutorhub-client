import { axiosPrivate } from "../utils/http-common"

const updateStudent = async (student) => {
    const response = await axiosPrivate.put(`/students/${student._id}`, student);
    return response;
}

const getStudentById = async (studentId) => {
    const response = await axiosPrivate.get(`/students/${studentId}`);
    return response;
}

const getAllStudents = async () => {
    const response = await axiosPrivate.get(`/students`);
    return response.data;
}

const studentService = {
    updateStudent,
    getStudentById,
    getAllStudents
}

export default studentService