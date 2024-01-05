import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: null,
    reducers: {
      setUser: (state, action) => {
        return action.payload;
      },
      clearUser: () => {
        return null;
      },
    },
});

export const selectUser = (state) => state.user; // shortcut for selector to retrieve user state
export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;