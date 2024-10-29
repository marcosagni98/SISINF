import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink } from "react-router-dom";

const Login: React.FC = () => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-main">
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
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
            />
            <NavLink to="/recover-password" className="text-decoration-none text-secondary">Forgot password?</NavLink>
          </div>
          <div className="d-grid gap-2 text-center">
            <button type="submit" className="btn btn-light">
              Sign In
            </button>
            <NavLink to="/register" className="text-decoration-none text-dark">Create an account</NavLink>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
