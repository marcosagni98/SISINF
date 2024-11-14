import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink, useNavigate } from 'react-router-dom';
import usePostRecoverPassword from '../../hooks/auth/usePostRecoverPassword';
import Swal from 'sweetalert2';
import { RecoverPassword } from '../../interfaces/auth/RecoverPassword';

const RecoverPasswordComponent: React.FC = () => {
  const [formData, setFormData] = useState<RecoverPassword>({ email: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const navigate = useNavigate();

  const { post: postRecoverPassword } = usePostRecoverPassword();

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
    <div className="d-flex justify-content-center align-items-center vh-100 bg-background">
      <div className="card p-4 bg-main" style={{ width: '350px' }}>
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
