/**
 * Interface that represents the structure of the response data after a successful login.
 * 
 * @interface LoginResponse
 * @property {string} token - The authentication token issued after the user successfully logs in.
 */
export interface LoginResponse {
    token: string;
}