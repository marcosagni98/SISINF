import React, { useEffect } from "react";
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
  label: string
}

/**
 * NavItem Component
 *
 * This component represents an individual navigation item for the sidebar. Each item
 * displays an icon and label, and uses `NavLink` for automatic active styling based
 * on the current route.
 *
 * @component
 * @param {NavItemProps} props - Properties containing the destination route (`to`),
 * the icon to display, and the label text for the navigation item.
 * @returns {React.ReactElement} - A styled navigation link item with an icon and label.
 */

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


/**
 * Sidebar Component
 *
 * This component renders a collapsible sidebar navigation menu. The sidebar displays
 * different navigation items based on the user's role, using icons for easy navigation.
 * The `NavItem` component is used to create each link, with conditional rendering for
 * items restricted to specific user roles.
 *
 * @component
 * @param {SidebarProps} props - Properties specifying whether the sidebar is collapsed.
 * @returns {React.ReactElement} - A sidebar component with navigation links tailored to
 * the user's role.
 */

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed }) => {
  const { user } = useAuth();

  return (
    <div className={`d-flex flex-column vh-100 ${isCollapsed ? 'd-none' : ''}`}>
      <nav className="nav flex-column p-3">
        <NavItem to="/" icon={faHome} label="Inicio" />
        <NavItem to="/newincidence" icon={faPlus} label="Nueva Incidencia" />
        <NavItem to="/mis-incidencias" icon={faList} label="Mis incidencias" />
        {user && user.role === UserRole.Administrator && <NavItem to="/statics" icon={faChartBar} label="Estadísticas" />}
        {user && user.role === UserRole.Administrator && <NavItem to="/users" icon={faUser} label="Usuarios" />}
        {user && user.role >= UserRole.Technician && <NavItem to="/historic" icon={faHistory} label="Histórico" />}
      </nav>
    </div>
  );
};

export default Sidebar;
