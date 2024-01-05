import { apiSlice } from "./apiSlice";

export const tutorsSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // to retrieve all tutors
        getAllTutors: builder.query({
            query: (page) => `/tutors?page=${page}`,
            providesTags: ["Tutor"]
        }),
        getTutorById: builder.query({
            query: (tutorId) => `/tutors/${tutorId}`,
            providesTags: ["Tutor"]
        }),
        updateTutor: builder.mutation({
            query: ({tutorId, newTutor}) => ({
                url: `/tutors/${tutorId}`,
                method: 'PUT',
                body: newTutor
            }),
            invalidatesTags: ["Tutor"]
        }),
        getAllSubjects: builder.query({
            query: () => '/tutors/subjects',
            invalidatesTags: ["Tutor"]
        })

    })
})
 
export const {
    useGetAllSubjectsQuery,
    useGetAllTutorsQuery,
    useGetTutorByIdQuery,
    useUpdateTutorMutation
} = tutorsSlice