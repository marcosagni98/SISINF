/**
 * Interface representing the data required for user register
 * @interface Register
 * @property {string} email - The email address associated with the user account
 * @property {string} password - The password for the user account
 * @property {string} name - The full name for the user account
 */
export interface Register {
    email: string;
    password: string;
    name: string;
}