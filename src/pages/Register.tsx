import React from 'react';
import RegisterComponent from '../components/Auth/RegisterComponent';

/**
 * RegisterPage component that renders the user registration form.
 * This page is used for new users to create an account.
 */
const RegisterPage: React.FC = () => {
  return (
    // Render the user registration form component
    <RegisterComponent />
  );
};

export default RegisterPage;
