import axios from 'axios';

export const uploadFile = async (formData) => {
    const res = await axios.post('http://localhost:3001/api/files', formData, {
        headers: {
        'Content-Type': 'multipart/form-data',
        },
    });
    return res.data;
};
