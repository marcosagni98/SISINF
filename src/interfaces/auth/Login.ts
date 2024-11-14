/**
 * Interface representing the data required for user login
 * @interface Login
 * @property {string} email - The email address associated with the user account
 * @property {string} password - The password for the user account
 */
export interface Login {
    email: string;
    password: string;
}