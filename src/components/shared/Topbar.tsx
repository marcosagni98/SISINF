import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faSun, faMoon, faUser, faBars, IconDefinition } from '@fortawesome/free-solid-svg-icons';

interface TopbarProps {
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
  title: string;
}

interface TopbarBtnProps {
  icon: IconDefinition; 
  clickHandler: () => void;
}

const TopbarBtn: React.FC<TopbarBtnProps> = ({ icon, clickHandler }) => (
  <FontAwesomeIcon
    className="btn btn-light"
    onClick={clickHandler}
    icon={icon}
  />
);

const Topbar: React.FC<TopbarProps> = ({ isCollapsed, setIsCollapsed, title }) => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('bg-dark', !darkMode);
    document.body.classList.toggle('text-white', !darkMode);
  };

  return (
    <div className="d-flex justify-content-between align-items-center py-2 px-3 bg-light">
      <TopbarBtn icon={faBars} clickHandler={() => setIsCollapsed(!isCollapsed)} />
      <h4 className="m-0">{title}</h4>
      <div className="d-flex align-items-center">
        <TopbarBtn icon={faMoon} clickHandler={toggleDarkMode} />
        <TopbarBtn icon={faBell} clickHandler={() => {}} />
        <TopbarBtn icon={faUser} clickHandler={() => {}} />
      </div>
    </div>
  );
};

export default Topbar;
