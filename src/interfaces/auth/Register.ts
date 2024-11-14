/**
 * Interface that represents the structure of data required for user registration.
 * 
 * @interface Register
 * @property {string} email - The email address of the user registering for an account.
 * @property {string} password - The password chosen by the user for their new account.
 * @property {string} name - The full name of the user registering for an account.
 */
export interface Register {
    email: string;
    password: string;
    name: string;
}