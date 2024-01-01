import { createSlice } from "@reduxjs/toolkit";

// Initial state for the authentication slice // Alternatively: isAuthenticated: false,
const initialState = { status: false, userData: null };

// Creating a slice for authentication with name "auth"
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Reducer function for handling the login action
    login: (state, action) => {
      state.status = true;
      state.userData = action.payload;
      // Both statements are correct; if the key and value of an object are the same, like in 'userData', we can simply write one, making it interchangeable.
      // Alternatively: state.userData = action.payload.user;
    },

    // Reducer function for handling the logout action
    logout: (state) => {
      state.status = false;
      state.userData = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout } = authSlice.actions;

// Exporting the reducer function for use in the Redux store
export default authSlice.reducer;
