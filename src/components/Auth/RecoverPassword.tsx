import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink } from 'react-router-dom';

const Register: React.FC = () => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4" style={{ width: '350px' }}>
        <form>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
            />
          </div>
          <div className="d-grid gap-2">
            <button type="submit" className="btn btn-dark">
              Recuperar contraseña
            </button>
            <NavLink to="/login" className="text-secondary mx-1">Iniciar sesión</NavLink>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
