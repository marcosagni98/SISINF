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
        <Sidebar isCollapsed={isCollapsed} />
        <div className="w-100 p-md-5 p-3 h-100 bg-background" style={{minHeight: '100vh'}}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
