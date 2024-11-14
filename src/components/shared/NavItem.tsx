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
 * NavItem Component
 *
 * This component renders a single navigation item as a link, with an icon and label.
 * It uses `NavLink` from `react-router-dom` to handle active link styling based on
 * the current route. Each link can display an icon, label text, and custom styling.
 *
 * @component
 * @param {NavItemProps} props - Component properties containing the target route,
 * icon, label, and additional CSS classes for styling.
 * @returns {React.ReactElement} - A styled navigation link with icon and label.
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
      <FontAwesomeIcon icon={icon} className="me-3" /> {label}
    </NavLink>
  );
};

export default NavItem;
