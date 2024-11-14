import { API_BASE_URL } from "../../config";
import { ChangePassword } from "../../interfaces/auth/ChangePassword";
import { GenericRespone } from "../../interfaces/shared/GenericRespone";

/** 
 * Custom hook to handle the change password PUT request
 * This hook provides a function to make a PUT request to the reset-password endpoint.
 * @returns {Object} - Contains the putData function to perform the change password request
 */
const usePutChangePassword = () => {
  
  /** 
   * Function to perform the change password PUT request
   * @param {string} token - The user's authentication token to authorize the request
   * @param {ChangePassword} data - The data required to change the password
   * @returns {Promise<{ data: GenericRespone | null; error: string | null }>} - Returns an object containing the response data or error
   */
  const putData = async (token: string, data: ChangePassword): Promise<{ data: GenericRespone | null; error: string | null }>  => {
    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      const config: RequestInit = {
        method: "PUT",
        headers,
        body: JSON.stringify(data),
      };

      const response = await fetch(`${API_BASE_URL}/api/v1/Auth/reset-password`, config);
      if (!response.ok) throw new Error("Error fetching data");

      const result = await response.json();
      return { data: result, error: null };
    } catch (err: unknown) {
      if (err instanceof Error) {
        return { data: null, error: err.message };
      } else {
        return { data: null, error: "Unknown error occurred" };
      }
    }
  };

  return { putData };
};

export default usePutChangePassword;
