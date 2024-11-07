import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import 'bootstrap/dist/css/bootstrap.min.css';

interface LayoutProps {
    children: React.ReactNode;
    title: string;
}

/**
 * Layout Component
 *
 * This component provides a general layout structure for the application, including a
 * top navigation bar (Topbar) and a sidebar (Sidebar). It accepts child components to
 * be rendered within the main content area and a title displayed on the top bar.
 *
 * The sidebar can be toggled between collapsed and expanded states.
 *
 * @component
 * @param {LayoutProps} props - Component properties containing children and title.
 * @returns {React.ReactElement} - The rendered layout with top and side navigation.
 */

const Layout: React.FC<LayoutProps> = ({ children, title }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="d-flex flex-column">
      <Topbar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} title={title} />
      <div className="d-flex">
        <Sidebar isCollapsed={isCollapsed} />
        <div className="col p-5 bg-main">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
