// src/components/ProtectedRoute/ProtectedRoute.tsx
import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";  

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  // Get token from Redux store
  const token = useSelector((state: RootState) => state.auth.token);

  // Or check directly in cookies (fallback)
  const cookieToken = Cookies.get("accessToken");

  // If no token found, redirect to login page
  if (!token && !cookieToken) {
    return <Navigate to="/login" replace />;
  }

  // Otherwise, show the protected component
  return <>{children}</>;
};

export default ProtectedRoute;
