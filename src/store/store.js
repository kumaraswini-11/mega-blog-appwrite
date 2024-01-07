import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";

// Configuring the Redux store using configureStore
const store = configureStore({
  // Combining reducers into the root reducer, with "auth" as a key
  reducer: {
    auth: authReducer,
    // TODO: add a reducer for PostSlice
  },
});

// Exporting the configured Redux store for use in the application
export default store;
