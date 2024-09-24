import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faPlus, faList, faChartBar, IconDefinition, faUser, faHistory } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from "react-router-dom";

interface SidebarProps {
  isCollapsed: boolean;
}

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

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed }) => {
  return (
    <div className={`d-flex flex-column bg-light vh-100 ${isCollapsed ? 'd-none' : ''}`}>
      <nav className="nav flex-column p-3">
        <NavItem to="/" icon={faHome} label="Inicio" />
        <NavItem to="/newincidence" icon={faPlus} label="Nueva Incidencia" />
        <NavItem to="/mis-incidencias" icon={faList} label="Mis incidencias" />
        <NavItem to="/estadisticas" icon={faChartBar} label="Estadísticas" />
        <NavItem to="/users" icon={faUser} label="Usuarios" />
        <NavItem to="/historico" icon={faHistory} label="Histórico" />
      </nav>
    </div>
  );
};

export default Sidebar;
