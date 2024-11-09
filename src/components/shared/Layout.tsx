import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import "bootstrap/dist/css/bootstrap.min.css";

interface LayoutProps {
  children: React.ReactNode;
  title: string;
}

const Layout: React.FC<LayoutProps> = ({ children, title }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="min-vh-100 bg-main d-flex flex-column">
      <Topbar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} title={title} />
      <div className="d-flex flex-grow-1 flex-lg-row flex-column">
        <Sidebar isCollapsed={isCollapsed} />
        <div className="content-container flex-grow-1 bg-background p-lg-5 p-3 overflow-auto">
          {children}
        </div>
      </div>
    </div>
  );
  
};

export default Layout;
