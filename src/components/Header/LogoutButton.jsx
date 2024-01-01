import React from "react";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/AuthService";
import { logout } from "../../store/authSlice";

function LogoutButton() {
  // Redux dispatch function
  const dispatch = useDispatch();

  // Asynchronous function to handle the logout process
  const handleLogout = async () => {
    try {
      // Calling the logout method from the authentication service
      await authService.logout();
      // Dispatching the logout action to update the authentication state in the Redux store
      dispatch(logout());
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
      role="button"
      aria-label="Logout"
    >
      Logout
    </button>
  );
}

export default LogoutButton;
