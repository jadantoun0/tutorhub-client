import { apiSlice } from "./apiSlice";

export const messageSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // to retrieve messages with another user
        getMessagesWithUser: builder.query({
            query: (userId) => `/messages/${userId}`,
            providesTags: ['Messages']
        }),
        // to retrieve latest messages for a user
        getLatestMessages: builder.query({
            query: () => `/messages/latest`,
            providesTags: ['LatestMessages']
        }),
        // to send a message to another user
        sendMessage: builder.mutation({
            query: (newMessage) => ({
                url: "/messages",
                method: 'POST',
                body: newMessage
            }),
            invalidatesTags: ['Messages', 'LatestMessages']
        })

    })
})

export const {
    useGetLatestMessagesQuery, 
    useGetMessagesWithUserQuery, 
    useSendMessageMutation
} = messageSlice