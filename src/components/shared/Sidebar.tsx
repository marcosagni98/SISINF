import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faPlus, faList, faChartBar, IconDefinition, faUser, faHistory } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { UserRole } from "../../enums/userRole";

interface SidebarProps {
  isCollapsed: boolean;
}

interface NavItemProps {
  to: string; 
  icon: IconDefinition; 
  label: string;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon, label }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `nav-link d-flex align-items-center text-decoration-none sidebar-button btn ${isActive ? 'fw-bold' : ''}`
      }
    >
      <FontAwesomeIcon icon={icon} className="me-3" /> {label}
    </NavLink>
  );
};

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed }) => {
  const { user } = useAuth();

  return (
    <div
      className={`sidebar bg-border-sidebar ${isCollapsed ? 'd-none' : 'd-xl-block'}`}
      style={{ minWidth: "225px" }}
    >
      <nav className="nav flex-column p-3">
        <NavItem to="/" icon={faHome} label="Inicio" />
        <NavItem to="/newincidence" icon={faPlus} label="Nueva Incidencia" />
        <NavItem to="/mis-incidencias" icon={faList} label="Mis incidencias" />
        {user && user.role === UserRole.Administrator && (
          <>
            <NavItem to="/stadistics" icon={faChartBar} label="Estadísticas" />
            <NavItem to="/users" icon={faUser} label="Usuarios" />
          </>
        )}
        {user && user.role >= UserRole.Technician && (
          <NavItem to="/historic" icon={faHistory} label="Histórico" />
        )}
      </nav>
    </div>
  );
};

export default Sidebar;
