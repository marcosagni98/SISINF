import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMoon,
  faUser,
  faBars,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";

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

const TopbarBtn: React.FC<TopbarBtnProps> = ({
  icon,
  clickHandler,
  className,
}) => (
  <button
    type="button"
    className={`btn btn-light ${className || ""}`}
    onClick={clickHandler}
  >
    <FontAwesomeIcon icon={icon} />
  </button>
);

const Topbar: React.FC<TopbarProps> = ({
  isCollapsed,
  setIsCollapsed,
  title,
}) => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("bg-dark", !darkMode);
    document.body.classList.toggle("text-white", !darkMode);
  };

  const handleLogout = () => {
    console.log("Cerrando sesión");
  };

  return (
    <div className="d-flex justify-content-between align-items-center py-3 px-4">
      <TopbarBtn
        icon={faBars}
        clickHandler={() => setIsCollapsed(!isCollapsed)}
      />
      <h4 className="m-0 fw-bold">{title}</h4>
      <div className="d-flex align-items-center">
        <TopbarBtn icon={faMoon} clickHandler={toggleDarkMode} />
        <div className="dropdown">
          <button
            type="button"
            className="btn btn-light dropdown-toggle"
            id="dropdownMenuButton"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <FontAwesomeIcon icon={faUser} />
          </button>
          <ul
            className="dropdown-menu dropdown-menu-end"
            aria-labelledby="dropdownMenuButton"
          >
            <li>
              <button className="dropdown-item text-danger" onClick={handleLogout}>
                Cerrar sesión
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
