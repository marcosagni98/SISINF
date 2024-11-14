import React from "react";
import { NavLink } from "react-router-dom";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "bootstrap/dist/css/bootstrap.min.css";

interface NavItemProps {
  to: string;
  icon: IconDefinition;
  label: string;
  className: string;
}

/**
 * Component for rendering a navigation link with an icon and label.
 * Highlights the link if it is active using React Router's `NavLink`.
 */
const NavItem: React.FC<NavItemProps> = ({ to, icon, label, className }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `nav-link d-flex align-items-center text-decoration-none btn ${className} ${
          isActive ? "fw-bold" : ""
        }`
      }
    >
      {/* Display the icon and label */}
      <FontAwesomeIcon icon={icon} className="me-3" /> {label}
    </NavLink>
  );
};

export default NavItem;
