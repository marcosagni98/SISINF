import { UserRole } from "../../enums/userRole";

export interface UsersTableRow {
  id: number;
  name: string;
  email: string;
  role: UserRole;
}
