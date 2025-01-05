import React from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated, getUserRole } from "../utils/auth";

const PrivateRoute = ({ element: Component, requiredRole }) => {
  const isLoggedIn = isAuthenticated();
  const role = getUserRole(); // Get the role using the helper function

  // Redirect to login if the user is not authenticated
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  // If a requiredRole is specified, check if the user's role matches
  if (requiredRole && role !== requiredRole) {
    
    return <Navigate to="/profile" />;
  }

  // If all checks pass, render the component
  return Component;
};

export default PrivateRoute;
