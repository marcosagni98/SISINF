import { API_BASE_URL } from "../../config";
import { GenericRespone } from "../../interfaces/shared/GenericRespone";
import usePutWithAuthBase from "../usePutWithAuthBase";

const usePutUpdateUserRole = () => {
    const { putData } =
        usePutWithAuthBase<GenericRespone, number>();

    const put = (id: number, data: number) => {
        return putData(`${API_BASE_URL}/api/v1/User/update-user-type/${id}`, data);
    };

    return { put };
};

export default usePutUpdateUserRole;
