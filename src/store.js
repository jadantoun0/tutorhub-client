import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./redux/services/apiSlice";
import userReducer from "./redux/store/userSlice";

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer, // rtk query requests
        user: userReducer, // passing persisted reducer
    },
    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`. (from official documentation)
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({serializableCheck: false}).concat(apiSlice.middleware)
})