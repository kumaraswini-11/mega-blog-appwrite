import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function ProtectedLayout({
  children,
  requireAuthentication = true,
}) {
  // Access to the navigation object to programmatically navigate between routes
  const navigate = useNavigate();
  // State to track the loading state
  const [isLoading, setIsLoading] = useState(true);
  // Extracting authentication status from the Redux store using useSelector
  const isAuthenticated = useSelector((store) => store.auth.status);

  // useEffect hook to handle authentication and loading logic
  useEffect(() => {
    // Redirect to login page if authentication is required and the user is not authenticated
    if (requireAuthentication && isAuthenticated !== requireAuthentication) {
      navigate("/login");
    }
    // Redirect to the home page if authentication is not required and the user is authenticated
    else if (
      !requireAuthentication &&
      isAuthenticated !== requireAuthentication
    ) {
      navigate("/");
    }

    // Set loading to false once the authentication check is complete
    setIsLoading(false);
  }, [navigate, isAuthenticated, requireAuthentication]);

  // JSX structure for the ProtectedLayout component
  return isLoading ? <h1>Loading...</h1> : <>{children}</>;
}
