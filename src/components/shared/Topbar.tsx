import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMoon,
  faUser,
  faBars,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../hooks/useAuth";

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
 * TopbarBtn Component
 *
 * This component represents an individual button within the topbar. The button
 * displays an icon and optionally executes a click handler when pressed.
 *
 * @component
 * @param {TopbarBtnProps} props - Properties containing the icon (`icon`) to display,
 * an optional `clickHandler` function triggered on button click, and an optional
 * `className` to add custom styles.
 * @returns {React.ReactElement} - A button element with an icon and optional click behavior.
 */

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

/**
 * Topbar Component
 *
 * This component renders a topbar with navigation controls, a title, and user settings.
 * It includes a toggle for dark mode and a logout option. The component receives a `title`
 * to display, and a state management function for toggling the sidebar's collapsed state.
 *
 * @component
 * @param {TopbarProps} props - Properties specifying if the sidebar is collapsed,
 * a function to toggle collapse (`setIsCollapsed`), and a `title` string for the topbar.
 * @returns {React.ReactElement} - A topbar component with navigation, title, and user options.
 */

const Topbar: React.FC<TopbarProps> = ({
  isCollapsed,
  setIsCollapsed,
  title,
}) => {
  const [darkMode, setDarkMode] = useState(false);
  const { logout } = useAuth();

  /**
   * Toggles the theme between light and dark mode.
   *
   * Updates the `data-bs-theme` attribute on the document root element to reflect
   * the selected theme, which Bootstrap uses to style elements accordingly.
   */

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    const newTheme = !darkMode ? 'light' : 'dark';
    document.documentElement.setAttribute('data-bs-theme', newTheme);
  };

   /**
   * Handles user logout by invoking the `logout` function from the authentication hook.
   */
  
  const handleLogout = () => {
    logout();
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
