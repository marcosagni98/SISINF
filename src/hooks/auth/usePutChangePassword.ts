import { API_BASE_URL } from "../../config";
import { ChangePassword } from "../../interfaces/auth/ChangePassword";
import { GenericRespone } from "../../interfaces/shared/GenericRespone";

const usePutChangePassword = () => {
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
