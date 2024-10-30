// src/components/Login.tsx

import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { Login as LoginInterface } from "../../interfaces/auth/Login";
import Swal from "sweetalert2";
import usePostLogin from "../../hooks/auth/login";

const Login: React.FC = () => {
  const [credentials, setCredentials] = useState<LoginInterface>({
    email: "",
    password: "",
  });

  const { login } = useAuth();
  const navigate = useNavigate();

  const {
    data: dataLogin,
    completed: completedLogin,
    error: errorLogin,
    post: postLogin,
  } = usePostLogin();

  useEffect(() => {
    if (completedLogin) {
      if (dataLogin) {
        login(dataLogin.accessToken);
        Swal.fire("Éxito", "Has iniciado sesión correctamente", "success");
        navigate("/dashboard");
      } else if (errorLogin) {
        Swal.fire("Error", errorLogin, "error");
      }
    }
  }, [dataLogin, errorLogin, completedLogin]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await postLogin(credentials);
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

export default Login;
