/**
 * Interface representing the data required to initiate a password recovery
 * @interface RecoverPassword
 * @property {string} email - The email address associated with the user account for password recovery
 */
export interface RecoverPassword {
    email: string;
}