import React from 'react';
import { NavLink } from 'react-router-dom';

/**
 * Unauthorized page component that displays a 403 error message.
 * This page is shown when a user tries to access a restricted route without the necessary permissions.
 */
const Unauthorized: React.FC = () => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-background">
      <h1 className="mb-4">403 - No autorizado</h1>
      <p>No tienes permiso para acceder a esta página.</p>
      {/* Button to redirect users back to the dashboard */}
      <NavLink to="/dashboard" className="btn btn-primary mt-3">
        Volver
      </NavLink>
    </div>
  );
};

export default Unauthorized;
