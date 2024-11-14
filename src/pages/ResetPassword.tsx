import React from 'react';
import ChangePasswordComponent from '../components/Auth/ChangePasswordComponent';

/** 
 * Page for resetting a user's password
 * This component is responsible for rendering the general page layout and the password change form.
 * @returns {JSX.Element} - Renders the layout with the password change form inside.
 */
const ResetPassword: React.FC = () => {
  return (
    <ChangePasswordComponent />
  );
};

export default ResetPassword;
