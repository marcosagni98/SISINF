/**
 * Interface representing the data required to change a user's password
 * @interface ChangePassword
 * @property {string} email - The email address associated with the user account
 * @property {string} password - The new password to set for the user account
 */
export interface ChangePassword {
    email: string;
    password: string;
}