import React from 'react';
import { NavLink } from 'react-router-dom';

const Unauthorized: React.FC = () => {
    return (
        <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-light">
            <h1 className="mb-4">403 - No autorizado</h1>
            <p>No tienes permiso para acceder a esta página.</p>
            <NavLink to="/dashboard" className="btn btn-primary mt-3">
                Volver
            </NavLink>
        </div>
    );
};

export default Unauthorized;
