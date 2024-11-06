import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Swal from "sweetalert2";
import { ChangePassword as ChangePasswordInterface } from "../../interfaces/auth/ChangePassword";
import { JwtPayload } from "../../context/AuthContext";
import usePutChangePassword from "../../hooks/auth/usePutChangePassword";

/**
 * ChangePasswordComponent
 * 
 * Component that renders a password reset form. It retrieves the email from the token provided in the URL,
 * and allows the user to change their password by entering a new password and confirming it.
 *
 * @component
 * @returns {React.ReactElement} - The rendered password change form
 */
const ChangePasswordComponent: React.FC = () => {
  const [formData, setFormData] = useState<ChangePasswordInterface>({ email: "", password: "" });
  const [repeatPassword, setRepeatPassword] = useState<string>("");
  const navigate = useNavigate();
  const location = useLocation();
  const { putData: putChangePassword } = usePutChangePassword();

  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");

  /**
   * useEffect - Decodes token to get user email, then updates formData with the email.
   * Redirects to /unauthorized if the token is invalid or missing.
   */
  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode<JwtPayload>(token);
        const email = decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"];
        setFormData((prevData) => ({ ...prevData, email }));
      } catch (error) {
        navigate("/unauthorized");
      }
    } else {
      navigate("/unauthorized");
    }
  }, [location, navigate]);

  /**
   * handleChange - Handles input changes for password and repeat-password fields
   *
   * @param {React.ChangeEvent<HTMLInputElement>} e - The input change event
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    if (id === "password") {
      setFormData({ ...formData, password: value });
    } else if (id === "repeat-password") {
      setRepeatPassword(value);
    }
  };

   /**
   * handleSubmit - Handles form submission for password change
   * Validates password matching, then attempts password change via API
   *
   * @param {React.FormEvent} e - The form submission event
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== repeatPassword) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Las contraseñas no coinciden",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    const { data, error } = await putChangePassword(token!, formData);

    if (data?.statusCode === 200) {
      Swal.fire({
        icon: "success",
        title: "Éxito",
        text: "Se ha cambiado la contraseña con éxito",
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
      <div className="card p-4" style={{ width: "350px" }}>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Contraseña
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={formData.password}
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
              value={repeatPassword}
              onChange={handleChange}
              required
            />
          </div>
          <div className="d-grid gap-2">
            <button type="submit" className="btn btn-dark">
              Cambiar contraseña
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

export default ChangePasswordComponent;
