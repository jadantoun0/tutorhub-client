import { apiSlice } from "./apiSlice";

export const authSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getUser: builder.query({
            query: () => `/auth/check`,
        }),
        logOut: builder.mutation({
            query: () => ({
                url: '/auth/signout',
                method: 'POST'
            })
        })
    })
})

export const {
    useGetUserQuery,
    useLogOutMutation
} = authSlice