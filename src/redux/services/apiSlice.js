import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// This file serves as the core configuration for RTK Query, an integral part of the
// Redux Toolkit. RTK Query simplify the process of interacting with API endpoints
// by handling data fetching, caching, and UI synchronization. It employs a smart caching
// system that automatically updates the UI to reflect changes from the server, achieved 
//through cache invalidation triggered by POST, PUT, or DELETE requests. This ensures that
// the client-side data remains in sync with the server, providing an efficient and 
// responsive user experience.


// Endpoints will be injected into this slice from entity-specific files, to enforce seperation 
// of concerns.
export const apiSlice = createApi({
    reducerPath: "apiSlice", // will be used to configure the redux store
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3001/api", 
        credentials: 'include'  // to include cookies in the request to fetch data from protected routes
    }),
    // this contains keys under which redux will cache data, this will be used to invalidate the cache
    // when a POST/PUT/DELETE request is sent. (when data is modified)
    tagTypes: ['Appointments', 'PendingAppointments', 'Messages', 'LatestMessages', 'Course', 'Courses', 'Tutor'], 
    endpoints: () => ({})
})

