import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token'); // Check if the token exists in localStorage

  if (!token) {
    // If no token, redirect to login page
    return <Navigate to="/" replace />;
  }

  return children; // If token exists, allow access to the dashboard
};

export default PrivateRoute;
