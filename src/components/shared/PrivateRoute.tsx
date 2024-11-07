import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { UserRole } from '../../enums/userRole';

interface PrivateRouteProps {
    roles?: UserRole[];
}

/**
 * PrivateRoute Component
 *
 * This component restricts access to specific routes based on user authentication
 * and role authorization. If the user is not authenticated, they are redirected
 * to the login page. If the user does not have the required role to access the
 * route, they are redirected to an unauthorized page. If both conditions are met,
 * the component renders the requested route's content.
 *
 * @component
 * @param {PrivateRouteProps} props - Component properties specifying optional roles
 * that are authorized to access the route.
 * @returns {React.ReactElement} - A protected route that either allows access to the
 * child route or redirects the user based on authentication and authorization status.
 */


const PrivateRoute: React.FC<PrivateRouteProps> = ({ roles }) => {
    const { token, user } = useAuth();

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    if (roles && user && !roles.includes(user.role)) {
        return <Navigate to="/unauthorized" replace />;
    }

    return <Outlet />;
};

export default PrivateRoute;
