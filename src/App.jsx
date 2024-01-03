import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import "./App.css";
import authService from "./appwrite/AuthService";
import { login, logout } from "./store/authSlice";
import { Header, Footer } from "./components";

function App() {
  // State to track loading state
  const [loading, setLoading] = useState(true);

  // Redux dispatch function
  const dispatch = useDispatch();

  // Effect hook to run code after the component has mounted
  useEffect(() => {
    // Asynchronous function to get the current user data from the authentication service
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData: userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false)); // Set loading to false once the authentication check is complete
  }, [dispatch]);

  return (
    <>
      {!loading && (
        <div className="min-h-screen flex flex-wrap content-between bg-gray-400">
          <div className="w-full block">
            {/* Rendering Header component */}
            <Header />
            <main>
              {/* Rendering child components based on the route */}
              <Outlet />
            </main>
            {/* Rendering Footer component */}
            <Footer />
          </div>
        </div>
      )}
    </>
  );
}

export default App;
