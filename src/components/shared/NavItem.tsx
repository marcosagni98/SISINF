import React from "react";
import { NavLink } from "react-router-dom";
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'bootstrap/dist/css/bootstrap.min.css';




interface NavItemProps {
    to: string; 
    icon: IconDefinition; 
    label: string
  }


  const NavItem: React.FC<NavItemProps> = ({ to, icon, label }) => {
    return (
      <NavLink
        to={to}
        className={({ isActive }) => 
          `nav-link d-flex align-items-center text-decoration-none text-dark btn btn-light ${isActive ? 'fw-bold' : ''}`
        }
      >
        <FontAwesomeIcon icon={icon} className="me-3" /> {label}
      </NavLink>
    );
  };

  export default NavItem;