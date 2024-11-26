import React from 'react';
import RecoverPasswordComponent from '../components/Auth/RecoverPasswordComponent';

/**
 * RecoverPage component that renders the password recovery form.
 * This page is used for users who have forgotten their password.
 */
const RecoverPage: React.FC = () => {
  return (
    // Render the password recovery form component
    <RecoverPasswordComponent />
  );
};

export default RecoverPage;
