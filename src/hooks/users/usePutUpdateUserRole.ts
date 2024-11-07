import { API_BASE_URL } from "../../config";
import { GenericRespone } from "../../interfaces/shared/GenericRespone";
import usePutWithAuthBase from "../usePutWithAuthBase";

/** 
 * Custom hook to update the role of a user with authentication
 * This hook simplifies the process of updating a user's role by sending the new role data.
 * @returns {Object} - Contains the put function to submit the updated user role
 */
const usePutUpdateUserRole = () => {
    const { putData } =
        usePutWithAuthBase<GenericRespone, number>();

    /** 
     * Function to update the role of a user
     * @param {number} id - The ID of the user whose role needs to be updated
     * @param {number} data - The new role ID to assign to the user
     * @returns {Promise<any>} - Returns a promise with the response from the API after updating the user role
     */
    const put = (id: number, data: number) => {
        return putData(`${API_BASE_URL}/api/v1/User/update-user-type/${id}`, data);
    };

    return { put };
};

export default usePutUpdateUserRole;
