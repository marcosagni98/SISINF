import React from 'react';
import RecoverPasswordComponent from '../components/Auth/RecoverPasswordComponent';

/** 
 * Page for recovering a user's password
 * This component is responsible for rendering the general page layout and the password recovery form.
 * @returns {JSX.Element} - Renders the layout with the password recovery form inside.
 */
const RecoverPage: React.FC = () => {
  return (
    <RecoverPasswordComponent />
  );
};

export default RecoverPage;
