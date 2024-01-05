import { apiSlice } from "./apiSlice";

export const studentsSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // to retrieve all students 
        getAllStudents: builder.query({
            query: () => `/students`,
            providesTags: ['Students']
        }),
    })
})

export const {
    useGetAllStudentsQuery
} = studentsSlice