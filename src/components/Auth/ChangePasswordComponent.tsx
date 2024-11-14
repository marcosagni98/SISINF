import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Swal from "sweetalert2";
import { ChangePassword as ChangePasswordInterface } from "../../interfaces/auth/ChangePassword";
import { JwtPayload } from "../../context/AuthContext";
import usePutChangePassword from "../../hooks/auth/usePutChangePassword";

/** 
 * Main component for changing the password.
 * Displays a form for users to change their password using a token.
 */
const ChangePasswordComponent: React.FC = () => {
  /** State for storing form data including email and password */
  const [formData, setFormData] = useState<ChangePasswordInterface>({ email: "", password: "" });
  /** State for storing the repeated password input */
  const [repeatPassword, setRepeatPassword] = useState<string>("");

  /** React Router's navigate function */
  const navigate = useNavigate();
  /** React Router's location object to access query parameters */
  const location = useLocation();

  /** Hook for sending the change password request */
  const { putData: putChangePassword } = usePutChangePassword();

  /** Extracting the token from the URL query parameters */
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");

  /** 
   * useEffect hook to decode the token and extract the email.
   * If token is invalid, navigates to the unauthorized page.
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
   * Handler for input changes in the password fields.
   * Updates the form data based on the field being changed.
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
   * Handles form submission for changing the password.
   * Validates passwords and sends a request to update the password.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    /** Check if the password and repeat password match */
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

    /** Sends the change password request using the provided token */
    const { data, error } = await putChangePassword(token!, formData);

    /** Handle the response and show appropriate notifications */
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

  /** 
   * Renders the password change form 
   */
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-background">
      <div className="card p-4 bg-main" style={{ width: "350px" }}>
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
          <div className="d-grid">
            <button type="submit" className="btn button-main-dark">
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
