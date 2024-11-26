import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink, useNavigate } from 'react-router-dom';
import usePostRecoverPassword from '../../hooks/auth/usePostRecoverPassword';
import Swal from 'sweetalert2';
import { RecoverPassword } from '../../interfaces/auth/RecoverPassword';

/**
 * Component for recovering a user's password.
 * Provides a form where users can enter their email to receive password reset instructions.
 */
const RecoverPasswordComponent: React.FC = () => {
  /** State for storing the email entered by the user */
  const [formData, setFormData] = useState<RecoverPassword>({ email: '' });

  /**
   * Handles input changes for the email field.
   * Updates the formData state with the current input value.
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  /** React Router's navigate function */
  const navigate = useNavigate();

  /** Hook for handling the password recovery API call */
  const { post: postRecoverPassword } = usePostRecoverPassword();

  /**
   * Handles form submission for password recovery.
   * Sends a request to the server with the user's email.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    /** Sends the recovery request using the entered email */
    const { data, error } = await postRecoverPassword(formData);

    /** Handle successful response */
    if (data?.statusCode === 200) {
      Swal.fire({
        icon: "success",
        title: "Éxito",
        text: "Se ha enviado al correo electrónico instrucciones para cambiar la contraseña",
        showConfirmButton: false,
        timer: 3000,
      });
      navigate("/login");
    } 
    /** Handle error response */
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
   * Renders the password recovery form 
   */
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-background">
      <div className="card p-4 bg-main" style={{ width: '350px' }}>
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
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          {/* Submit Button and Navigation Link */}
          <div className="d-grid">
            <button type="submit" className="btn button-main-dark">
              Recuperar contraseña
            </button>
            <NavLink to="/login" className="text-secondary mx-1">
              Iniciar sesión
            </NavLink>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RecoverPasswordComponent;
