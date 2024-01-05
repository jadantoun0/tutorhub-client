import React, { useEffect, useRef, useState } from 'react'
import ChatBox from './ChatBox';
import CustomLoadingSpinner from '../common/CustomLoadingSpinner';
import { useGetMessagesWithUserQuery, useSendMessageMutation } from '../../redux/services/messageSlice';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/store/userSlice';
import socket from '../../utils/socket';

const ChatSpace = ({selectedUser, isTutor}) => {

    const [messages, setMessages] = useState(null);
    const {data: fetchedMessages, isLoading, error} = useGetMessagesWithUserQuery(selectedUser._id);
   
    const [sendMessage] = useSendMessageMutation();

    useEffect(() => {
        setMessages(fetchedMessages);
    }, [fetchedMessages])

    const [writtenMsg, setWrittenMsg] = useState("");
    const user = useSelector(selectUser);

    // to scroll to the bottom when a new message is created
    const messagesRef = useRef(null); 

    useEffect(() => {
        // Scroll to the bottom when messages change
        if (messagesRef.current) {
          messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
        }
    }, [messages]);


    useEffect(() => {
        // Emit registerUser event
        socket.emit('registerUser', user._id);
      
        // Add an event listener for privateMessage
        const handlePrivateMessage = (data) => {

          const message = {
            messageContent: data.message,
            tutor: user.role.toLowerCase() === 'tutor' ? user._id : data.senderId,
            student: user.role.toLowerCase() === 'tutor' ? data.senderId : user._id,
            sender: user.role.toLowerCase() === 'tutor' ? 'student' : 'tutor'
          };

          // checking conditions to display the message in the correct chat

          if (
            (user.role.toLowerCase() === 'student' && message.tutor === selectedUser._id) || 
            (user.role.toLowerCase() === 'tutor' && message.student === selectedUser._id)
          ) {
              setMessages(prevMessages => [...prevMessages, message]);
          }
        };
      
        socket.on('privateMessage', handlePrivateMessage);
      
        // cleanup function
        return () => {
          // Remove the event listener
          socket.off('privateMessage', handlePrivateMessage); // not necessary
      
        };
    }, [user, selectedUser]);  
      
    
    const changeMessage = (e) => {
        setWrittenMsg(e.target.value);
    }

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (writtenMsg === '')
            return;

        try {
            // storing message in db
            sendMessage({messageContent: writtenMsg, receiverId: selectedUser._id})

            // sending it to other user in real-time 
            socket.emit('privateMessage', {
                receiverId: selectedUser._id,
                senderId: user._id,
                message: writtenMsg
            })
            // clearing current written message
            setWrittenMsg("")
            
            // Adding sent message to messages array to be able to see it
            const message = {
                messageContent: writtenMsg,
                tutor: user.role.toLowerCase() === 'tutor' ? user._id : selectedUser._id,
                student: user.role.toLowerCase() === 'tutor' ? selectedUser._id : user._id,
                sender: user.role.toLowerCase() === 'tutor' ? 'tutor' : 'student'
            };
            console.log('message SENT');
            setMessages(prevMessages => [...prevMessages, message]);
            
        } catch(err) {
            console.log(err);
        }
    }

    if (error) {
        return <p>Error Fetching data from the server</p>
    }
    if (isLoading) {
        return <CustomLoadingSpinner />
    }

  return (
    <>
        <div className="relative w-full p-6 overflow-y-auto h-[30rem]" ref={messagesRef}>
            <ul className="space-y-2">
            {/* MESSAGE */}
            {messages?.map(message => <ChatBox message={message} isTutor={isTutor}/>)}
            </ul>
        </div>

        <form 
            onSubmit={handleSendMessage} 
            className="flex items-center justify-between w-full p-3 border-t border-borderColor ">
            <button>
                <svg
                    xmlns="http://www.w3.org/2000/svg" 
                    stroke="currentColor"
                    className="w-6 h-6 text-gray-500" fill="none" viewBox="0 0 24 24"
                >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </button>
            <button>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                </svg>
            </button>

            <input 
                type="text" 
                placeholder="Write a message"
                className="block w-full py-2 pl-4 mx-3 bg-gray-100 rounded-full outline-none focus:text-gray-700"
                name="message" 
                required 
                value={writtenMsg}
                onChange={changeMessage}
            />
            <button>
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="w-5 h-5 text-gray-500" 
                    fill="none" 
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path 
                        stroke-linecap="round" 
                        stroke-linejoin="round" stroke-width="2"
                        d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" 
                    />
                </svg>
            </button>
            <button type="submit">
                <svg className="w-5 h-5 text-gray-500 origin-center transform rotate-90" xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20" fill="currentColor">
                    <path
                    d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
            </button>
        </form>

    </>
  )
}

export default ChatSpace