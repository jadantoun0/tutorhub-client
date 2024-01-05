const { axiosPrivate } = require("../http-common")

const getAllMessages = async () => {
    const response = await axiosPrivate.get('/messages');
    return response.data;
}

const getMessagesWithUser = async (userId) => {
    const response = await axiosPrivate.get(`/messages/${userId}`);
    return response.data;
}

const sendMessage = async (message) => {
    const response = await axiosPrivate.post('/messages', message)
    return response.data;
}

const messageService = {
    getAllMessages,
    getMessagesWithUser,
    sendMessage
}

export default messageService