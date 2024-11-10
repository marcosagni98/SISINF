import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { Register as RegisterInterface } from "../../interfaces/auth/Register";
import Swal from "sweetalert2";
import usePostRegister from "../../hooks/auth/usePostRegister";

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

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
    <div className="d-flex justify-content-center align-items-center vh-100 bg-background">
      <div className="card p-4 bg-main" style={{ width: '350px' }}>
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
