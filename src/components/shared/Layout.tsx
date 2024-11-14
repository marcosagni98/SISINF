import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import "bootstrap/dist/css/bootstrap.min.css";

interface LayoutProps {
  children: React.ReactNode;
  title: string;
}

/**
 * Layout component that provides a consistent structure for the application's pages.
 * It includes a topbar, a collapsible sidebar, and a content area.
 */
const Layout: React.FC<LayoutProps> = ({ children, title }) => {
  /** State to manage whether the sidebar is collapsed or expanded */
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="min-vh-100 bg-main d-flex flex-column">
      <Topbar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} title={title} />
      <div className="d-flex flex-grow-1 flex-xl-row flex-column">
        {/* Sidebar component, collapses or expands based on the state */}
        <Sidebar isCollapsed={isCollapsed} />

        {/* Content area that displays the page content passed as children */}
        <div className="content-container flex-grow-1 bg-background p-xl-5 p-3 overflow-auto">
          {children}
        </div>
      </div>
    </div>
  );
  
};

export default Layout;
