/**
 * Represents a generic API response structure containing a status code and message.
 * 
 * @interface GenericResponse
 * @property {number} statusCode - The HTTP status code representing the result of the API request.
 * @property {string} message - A message providing additional information about the API response.
 */
export interface GenericRespone {
    statusCode: number;
    message: string;
}