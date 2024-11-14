/**
 * Interface that represents the structure of data for logging a user in.
 * 
 * @interface Login
 * @property {string} email - The email address of the user trying to log in.
 * @property {string} password - The password associated with the user's account.
 */
export interface Login {
    email: string;
    password: string;
}