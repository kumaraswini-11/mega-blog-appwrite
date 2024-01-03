import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import store from "./store/store";
import { ProtectedLayout as AuthLayout, Login } from "./components";
import App from "./App.jsx";
import "./index.css";

import Home from "./pages/Home.jsx";
import AddPost from "./pages/AddPost";
import Signup from "./pages/Signup";
import EditPost from "./pages/EditPost";
import Post from "./pages/Post";
import AllPosts from "./pages/AllPost";

// Creating a BrowserRouter for React Router
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // Root App component
    children: [
      {
        path: "/",
        element: <Home />, // Home page component
      },
      {
        path: "/login",
        element: (
          // Layout for the login page without authentication
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        ),
      },
      {
        path: "/signup",
        element: (
          // Layout for the signup page without authentication
          <AuthLayout authentication={false}>
            <Signup />
          </AuthLayout>
        ),
      },
      {
        path: "/all-posts",
        element: (
          // Layout for the AllPosts page with authentication
          <AuthLayout authentication>
            {" "}
            <AllPosts />
          </AuthLayout>
        ),
      },
      {
        path: "/add-post",
        element: (
          // Layout for the AddPost page with authentication
          <AuthLayout authentication>
            {" "}
            <AddPost />
          </AuthLayout>
        ),
      },
      {
        path: "/edit-post/:slug",
        element: (
          // Layout for the EditPost page with authentication
          <AuthLayout authentication>
            {" "}
            <EditPost />
          </AuthLayout>
        ),
      },
      {
        path: "/post/:slug",
        element: <Post />, // Post page component
      },
    ],
  },
]);

// Rendering the application with ReactDOM.createRoot
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
