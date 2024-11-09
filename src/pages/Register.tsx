  import React from 'react';
  import RegisterComponent from '../components/Auth/RegisterComponent';

  /** 
 * Page for user registration
 * This component is responsible for rendering the general page layout and the user registration form.
 * @returns {JSX.Element} - Renders the layout with the user registration form inside.
 */
  const RegisterPage: React.FC = () => {
    return (
      <RegisterComponent />
    );
  };

  export default RegisterPage;
