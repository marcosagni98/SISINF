import React from 'react';
import ChangePasswordComponent from '../components/Auth/ChangePasswordComponent';

/**
 * ResetPassword page component that renders the change password form.
 * This page is used for users who are resetting their password using a token.
 */
const ResetPassword: React.FC = () => {
  return (
    // Render the change password form component
    <ChangePasswordComponent />
  );
};

export default ResetPassword;
