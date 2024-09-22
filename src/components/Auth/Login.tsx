import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Login: React.FC = () => {
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
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
            />
            <a href="#" className="text-decoration-none text-secondary">
              Forgot password?
            </a>
          </div>
          <div className="d-grid gap-2 text-center">
            <button type="submit" className="btn btn-dark">
              Sign In
            </button>
            <a href="#" className="text-decoration-none text-dark">
              Create an account
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
