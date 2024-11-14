/**
 * Interface that represents the structure of data for changing a user's password.
 * 
 * @interface ChangePassword
 * @property {string} email - The email address of the user who wants to change their password.
 * @property {string} password - The new password that the user wants to set.
 */
export interface ChangePassword {
    email: string;
    password: string;
}