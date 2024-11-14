import React from 'react';
import LoginComponent from '../components/Auth/LoginComponent';

/** 
 * Page for creating a new incidence
 * This component is responsible for rendering the general page layout and the create incidence form.
 * @returns {JSX.Element} - Renders the layout with the create incidence form inside.
 */
const LoginPage: React.FC = () => {
  return (
    <LoginComponent />
  );
};

export default LoginPage;
