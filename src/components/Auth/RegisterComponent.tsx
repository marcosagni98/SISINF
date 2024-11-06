import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { Register as RegisterInterface } from "../../interfaces/auth/Register";
import Swal from "sweetalert2";
import usePostRegister from "../../hooks/auth/usePostRegister";


/**
 * RegisterComponent
 * 
 * Renders a registration form allowing new users to create an account by providing 
 * their name, email, and password. Submits the information to the registration API, 
 * and gives feedback upon success or error.
 *
 * @component
 * @returns {React.ReactElement} - The rendered registration form
 */
const RegisterComponent: React.FC = () => {
  const [credentials, setCredentials] = useState<RegisterInterface>({
    email: "",
    password: "",
    name: "",
  });

  const navigate = useNavigate();

  const {
    post: postRegister,
  } = usePostRegister();

  /**
   * handleChange - Updates form field values in credentials state as user types
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
   * handleSubmit - Handles form submission, making a request to the registration API,
   * showing feedback on success or failure, and navigating to the login page on success.
   *
   * @param {React.FormEvent<HTMLFormElement>} e - Form submission event
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { data, error } = await postRegister(credentials);

    if (data?.statusCode === 201) {
      Swal.fire({
        icon: "success",
        title: "Éxito",
        text: "Te has registrado correctamente",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/login");
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
      <div className="card p-4" style={{ width: '350px' }}>
        <form onSubmit={handleSubmit}>
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
          </div>
          <div className="mb-3">
            <label htmlFor="repeat-password" className="form-label">
              Repetir contraseña
            </label>
            <input
              type="password"
              className="form-control"
              id="repeat-password"
            />
          </div>
          <div className="d-grid gap-2">
            <button type="submit" className="btn btn-dark">
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
