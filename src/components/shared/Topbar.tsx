// Topbar.tsx
import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faUser, faBars, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../hooks/useAuth";
import { ThemeContext } from "../../context/ThemeContext";

interface TopbarProps {
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
  title: string;
}

interface TopbarBtnProps {
  icon: IconDefinition;
  clickHandler?: () => void;
  className?: string;
}

/**
 * Button component for the topbar, used for various actions like toggling the sidebar or theme.
 */
const TopbarBtn: React.FC<TopbarBtnProps> = ({ icon, clickHandler, className }) => (
  <button type="button" className={`btn ${className || ""}`} onClick={clickHandler}>
    <FontAwesomeIcon icon={icon} />
  </button>
);

/**
 * Topbar component that displays the application title, a sidebar toggle button, and user controls.
 * Includes options for theme toggling and logging out.
 */
const Topbar: React.FC<TopbarProps> = ({ isCollapsed, setIsCollapsed, title }) => {
  /** Get the logout function from the authentication context */
  const { logout } = useAuth();
  /** Get the theme toggling function from the theme context */
  const { toggleTheme } = useContext(ThemeContext);

  /** Handles user logout */
  const handleLogout = () => {
    logout();
  };

  return (
    <div className="bg-border-topbar text-center py-3 px-4">
      <div className="d-flex justify-content-between align-items-center">
        {/* Button to toggle the sidebar */}
        <TopbarBtn icon={faBars} clickHandler={() => setIsCollapsed(!isCollapsed)} />
        
        {/* Page title */}
        <h4 className="m-0 fw-bold">{title}</h4>
        
        {/* User controls: theme toggle and user dropdown menu */}
        <div className="d-flex align-items-center">
          {/* Button to toggle the theme */}
          <TopbarBtn icon={faMoon} clickHandler={toggleTheme} />
          
          {/* User profile dropdown */}
          <div className="dropdown">
            <button
              type="button"
              className="btn dropdown-toggle"
              id="dropdownMenuButton"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <FontAwesomeIcon icon={faUser} />
            </button>
            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton">
              <li>
                <button className="dropdown-item text-danger" onClick={handleLogout}>
                  Cerrar sesión
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};


export default Topbar;
