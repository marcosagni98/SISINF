import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { Register as RegisterInterface } from "../../interfaces/auth/Register";
import Swal from "sweetalert2";
import usePostRegister from "../../hooks/auth/usePostRegister";

/**
 * Component for user registration.
 * Provides a form for users to register by entering their name, email, and password.
 */
const RegisterComponent: React.FC = () => {
  /** State for storing user registration credentials */
  const [credentials, setCredentials] = useState<RegisterInterface>({
    email: "",
    password: "",
    name: "",
  });

  /** React Router's navigate function */
  const navigate = useNavigate();

  /** Hook for handling the registration API call */
  const { post: postRegister } = usePostRegister();

  /**
   * Handles changes to the input fields.
   * Updates the credentials state based on the field being changed.
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /**
   * Handles form submission for user registration.
   * Sends a registration request and handles success or error responses.
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    /** Sends the registration request with the provided credentials */
    const { data, error } = await postRegister(credentials);

    /** Handle successful registration */
    if (data?.statusCode === 201) {
      Swal.fire({
        icon: "success",
        title: "Éxito",
        text: "Te has registrado correctamente",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/login");
    } 
    /** Handle registration error */
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
   * Renders the registration form 
   */
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-background">
      <div className="card p-4 bg-main" style={{ width: '350px' }}>
        <form onSubmit={handleSubmit}>
          {/* Input for Name */}
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Nombre
            </label>
            <input
              className="form-control"
              id="name"
              name="name"
              value={credentials.name}
              onChange={handleChange}
              required
            />
          </div>

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
          </div>

          {/* Input for Repeat Password */}
          <div className="mb-3">
            <label htmlFor="repeat-password" className="form-label">
              Repetir contraseña
            </label>
            <input
              type="password"
              className="form-control"
              id="repeat-password"
              required
            />
          </div>

          {/* Submit Button and Navigation Link */}
          <div className="d-grid">
            <button type="submit" className="btn button-main-dark">
              Registrarse
            </button>
            <span className="text-secondary">
              ¿Ya tienes una cuenta?
              <NavLink to="/login" className="text-secondary mx-1">Iniciar sesión</NavLink>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterComponent;
