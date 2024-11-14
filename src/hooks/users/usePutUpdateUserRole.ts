import { API_BASE_URL } from "../../config";
import { GenericRespone } from "../../interfaces/shared/GenericRespone";
import usePutWithAuthBase from "../usePutWithAuthBase";

const usePutUpdateUserRole = () => {

    /**
     * Destructure the 'putData' function from the custom hook 'usePutWithAuthBase'.
     * 'usePutWithAuthBase' is a custom hook that handles PUT requests with authentication.
     * The response type is 'GenericRespone', which is a generic response structure,
     * and the request data type is 'number', which represents the user role ID or type.
     */
    const { putData } =
        usePutWithAuthBase<GenericRespone, number>();

    /**
     * 'put' function: Accepts 'id' (user ID) and 'data' (the new user role type, represented as a number) as parameters.
     * It sends a PUT request to update the user role.
     * 
     * @param {number} id - The user ID of the user whose role needs to be updated.
     * @param {number} data - The new role type (as a number) to assign to the user.
     * @returns {Promise} - A promise that resolves with the response from the API, which is of type 'GenericRespone'.
     */
    const put = (id: number, data: number) => {
        return putData(`${API_BASE_URL}/api/v1/User/update-user-type/${id}`, data);
    };

    return { put };
};

export default usePutUpdateUserRole;
