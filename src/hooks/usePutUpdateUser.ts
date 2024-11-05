import { API_BASE_URL } from "../config";
import { GenericRespone } from "../interfaces/shared/GenericRespone";
import usePutWithAuthBase from "./usePutWithAuthBase";
import { UpdateUser } from "../interfaces/users/UpdateUser";

const usePutUpdateUser = () => {
    const { putData } =
        usePutWithAuthBase<GenericRespone, UpdateUser>();

    const put = (id: number, data: UpdateUser) => {
        return putData(`${API_BASE_URL}/api/v1/Incident/update-user-type/${id}`, data);
    };

    return { put };
};

export default usePutUpdateUser;
