import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { Login as LoginInterface } from "../../interfaces/auth/Login";
import Swal from "sweetalert2";
import usePostLogin from "../../hooks/auth/usePostLogin";

/**
 * Component for user login.
 * Provides a form for users to enter their credentials and log in.
 */
const LoginComponent: React.FC = () => {
  /** State to store user credentials (email and password) */
  const [credentials, setCredentials] = useState<LoginInterface>({
    email: "",
    password: "",
  });

  /** Access the login function from the authentication context */
  const { login } = useAuth();

  /** React Router's navigate function */
  const navigate = useNavigate();

  /** Hook for handling the login API call */
  const { post: postLogin } = usePostLogin();

  /**
   * Handles changes to the input fields.
   * Updates the credentials state based on the input field that was changed.
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /**
   * Handles form submission for logging in.
   * Sends a login request and handles success or error responses.
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    /** Sends the login request with the provided credentials */
    const { data, error } = await postLogin(credentials);

    /** Handle successful login */
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
    } 
    /** Handle login error */
    else if (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  /** 
   * Renders the login form
   */
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-background">
      <div className="card p-4 bg-main" style={{ width: "350px" }}>
        <form onSubmit={handleSubmit}>
          {/* Input for Email */}
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

          {/* Input for Password */}
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

          {/* Submit Button and Navigation Links */}
          <div className="d-grid text-center">
            <button type="submit" className="btn button-main-dark">
              Iniciar sesión
            </button>
            <NavLink to="/register" className="text-decoration-none text-secondary">
              Registrarse
            </NavLink>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginComponent;
