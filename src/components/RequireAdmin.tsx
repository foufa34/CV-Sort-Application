import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const RequireAdmin: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) return null; // or a loading spinner

  if (!user || user.role !== 'admin') {
    // Redirect non-admins to the user dashboard or login
    return <Navigate to={user ? '/dashboard' : '/login'} state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default RequireAdmin; 