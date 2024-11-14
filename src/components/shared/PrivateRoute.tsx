import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { UserRole } from '../../enums/userRole';

interface PrivateRouteProps {
  roles?: UserRole[];
}

/**
 * Component for protecting routes based on authentication and user roles.
 * If the user is not authenticated, they are redirected to the login page.
 * If the user does not have the required role, they are redirected to an unauthorized page.
 */
const PrivateRoute: React.FC<PrivateRouteProps> = ({ roles }) => {
  /** Get the current authentication status and user information */
  const { token, user } = useAuth();

  /**
   * Redirect to the login page if the user is not authenticated.
   */
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  /**
   * If roles are specified, check if the user has the required role.
   * Redirect to the unauthorized page if the user does not have access.
   */
  if (roles && user && !roles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  /** Render the protected component if authentication and role checks pass */
  return <Outlet />;
};

export default PrivateRoute;
