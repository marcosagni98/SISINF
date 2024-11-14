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

const TopbarBtn: React.FC<TopbarBtnProps> = ({ icon, clickHandler, className }) => (
  <button type="button" className={`btn ${className || ""}`} onClick={clickHandler}>
    <FontAwesomeIcon icon={icon} />
  </button>
);

const Topbar: React.FC<TopbarProps> = ({ isCollapsed, setIsCollapsed, title }) => {
  const { logout } = useAuth();
  const { toggleTheme } = useContext(ThemeContext);

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="bg-border-topbar text-center py-3 px-4">
      <div className="d-flex justify-content-between align-items-center">
        <TopbarBtn icon={faBars} clickHandler={() => setIsCollapsed(!isCollapsed)} />
        <h4 className="m-0 fw-bold">{title}</h4>
        <div className="d-flex align-items-center">
          <TopbarBtn icon={faMoon} clickHandler={toggleTheme} />
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
