import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import 'bootstrap/dist/css/bootstrap.min.css';

interface LayoutProps {
    children: React.ReactNode;
    title: string;
}

const Layout: React.FC<LayoutProps> = ({ children, title }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="d-flex flex-column bg-main">
      <Topbar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} title={title} />
      <div className="d-flex">
        <div style={{minWidth: "225px"}}>
          <Sidebar isCollapsed={isCollapsed} />
        </div>
        <div className="col p-5 vh-100 bg-background">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
