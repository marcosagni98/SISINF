import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { Login as LoginInterface } from "../../interfaces/auth/Login";
import Swal from "sweetalert2";
import usePostLogin from "../../hooks/auth/usePostLogin";


/**
 * LoginComponent
 * 
 * Renders a login form allowing users to enter their email and password, handles
 * authentication logic by calling the login API and updating the auth context on success.
 * Provides navigation to registration and password recovery routes.
 *
 * @component
 * @returns {React.ReactElement} - The rendered login form
 */
const LoginComponent: React.FC = () => {
  const [credentials, setCredentials] = useState<LoginInterface>({
    email: "",
    password: "",
  });

  const { login } = useAuth();
  const navigate = useNavigate();

  const { post: postLogin } = usePostLogin();
  
  /**
   * handleChange - Updates credentials state when input fields change
   *
   * @param {React.ChangeEvent<HTMLInputElement>} e - Input change event
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /**
   * handleSubmit - Submits the login form, calling the login API
   * and handling success or error responses
   *
   * @param {React.FormEvent<HTMLFormElement>} e - Form submission event
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { data, error } = await postLogin(credentials);
    if (data) {
      login(data.token);
      Swal.fire({
        icon: "success",
        title: "Éxito",
        text: "Has iniciado sesión correctamente",
        showConfirmButton: false,
        timer: 1500,
      });

      navigate("/dashboard");
    } else if (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4" style={{ width: "350px" }}>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Contraseña
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              required
            />
            <NavLink
              to="/recover-password"
              className="text-decoration-none text-secondary"
            >
              ¿Has olvidado tu contraseña?
            </NavLink>
          </div>
          <div className="d-grid gap-2 text-center">
            <button type="submit" className="btn btn-dark">
              Iniciar sesión
            </button>
            <NavLink to="/register" className="text-decoration-none text-dark">
              Registrarse
            </NavLink>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginComponent;
