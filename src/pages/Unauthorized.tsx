import React from 'react';
import { NavLink } from 'react-router-dom';

/** 
 * Page for handling unauthorized access
 * This component is responsible for displaying a message indicating that the user does not have permission to access the page,
 * and providing a link to redirect the user back to the dashboard.
 * @returns {JSX.Element} - Renders the unauthorized access message and a link to navigate back to the dashboard.
 */
const Unauthorized: React.FC = () => {
    return (
        <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-background">
            <h1 className="mb-4">403 - No autorizado</h1>
            <p>No tienes permiso para acceder a esta página.</p>
            <NavLink to="/dashboard" className="btn btn-primary mt-3">
                Volver
            </NavLink>
        </div>
    );
};

export default Unauthorized;
