import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem("token");
  const userStr = localStorage.getItem("user");

  if (!token || !userStr) {
    return <Navigate to="/login" replace />;
  }

  try {
    const user = JSON.parse(userStr);
    
    if (allowedRoles && !allowedRoles.includes(user.role)) {
      // User is logged in but does not have the required role
      if (user.role === "citizen") {
        return <Navigate to="/citizen-dashboard" replace />;
      } else if (user.role === "worker") {
        return <Navigate to="/worker-dashboard" replace />;
      } else if (user.role === "admin") {
        return <Navigate to="/admin-dashboard" replace />;
      }
      return <Navigate to="/" replace />;
    }
  } catch (e) {
    localStorage.clear();
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
