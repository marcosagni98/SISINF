import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink, useNavigate } from 'react-router-dom';
import usePostRecoverPassword from '../../hooks/auth/usePostRecoverPassword';
import Swal from 'sweetalert2';
import { RecoverPassword } from '../../interfaces/auth/RecoverPassword';


/**
 * RecoverPasswordComponent
 * 
 * Renders a form to initiate a password recovery process. The user provides their email,
 * and upon submission, an API request is made to send password reset instructions.
 * Handles both success and error responses with feedback to the user.
 *
 * @component
 * @returns {React.ReactElement} - The rendered password recovery form
 */
const RecoverPasswordComponent: React.FC = () => {
  const [formData, setFormData] = useState<RecoverPassword>({ email: '' });


  /**
   * handleChange - Updates the email in formData state when input changes
   *
   * @param {React.ChangeEvent<HTMLInputElement>} e - Input change event
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const navigate = useNavigate();

  const { post: postRecoverPassword } = usePostRecoverPassword();

  /**
   * handleSubmit - Submits the form, calling the password recovery API and handling responses
   *
   * @param {React.FormEvent} e - Form submission event
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { data, error } = await postRecoverPassword(formData);

    if (data?.statusCode === 200) {
      Swal.fire({
        icon: "success",
        title: "Éxito",
        text: "Se ha enviado al correo electrónico instrucciones para cambiar la contraseña",
        showConfirmButton: false,
        timer: 3000,
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
          <div className="d-grid gap-2">
            <button type="submit" className="btn btn-dark">
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
