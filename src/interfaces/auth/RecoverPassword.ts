/**
 * Interface that represents the structure of data required for password recovery.
 * 
 * @interface RecoverPassword
 * @property {string} email - The email address of the user requesting a password recovery.
 */
export interface RecoverPassword {
    email: string;
}