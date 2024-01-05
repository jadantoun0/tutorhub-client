import { apiSlice } from "./apiSlice";

export const courseSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createCourse: builder.mutation({
            query: (data) => ({
                url: '/courses',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ["Courses"]
        }),
        getCourses: builder.query({
            query: () => "/courses",
            providesTags: ["Courses"]
        }),
        deleteCouse: builder.mutation({
            query: (courseId) => ({
                url: `/courses/${courseId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ["Courses"]
        }),
        getCourseById: builder.query({
            query: (id) => `/courses/${id}`,
            providesTags: ["Course"]
        }),
        addFileToWeek: builder.mutation({
            query: (data) => ({
                url: `/courses/${data.courseId}/addFile/${data.weekNumber}`,
                method: 'POST',
                body: data.body,
            }),
            invalidatesTags: ["Course"]          
        }),
        removeFileFromWeek: builder.mutation({
            query: (data) => ({
                url: `/courses/${data.courseId}/deleteFile/${data.weekNumber}/${data.index}`,
                method: 'DELETE'
            }),
            invalidatesTags: ["Course"]          
        }),
        addStudentToCourse: builder.mutation({
            query: (data) => ({
                url: `/courses/${data.courseId}/addStudent/${data.studentId}`,
                method: 'POST'
            }),
            invalidatesTags: ["Course"]          
        }),
        removeStudentFromCourse: builder.mutation({
            query: (data) => ({
                url: `/courses/${data.courseId}/removeStudent/${data.studentId}`,
                method: 'DELETE'
            }),
            invalidatesTags: ["Course"]          
        })
          
    })
})

export const {
    useGetCoursesQuery,
    useCreateCourseMutation,
    useGetCourseByIdQuery,
    useAddFileToWeekMutation,
    useRemoveFileFromWeekMutation,
    useDeleteCouseMutation,
    useAddStudentToCourseMutation,
    useRemoveStudentFromCourseMutation
} = courseSlice