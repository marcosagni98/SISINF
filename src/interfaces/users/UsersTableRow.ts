import { UserRole } from "../../enums/userRole";

/**
 * Represents a row of data for a user in the table view.
 * 
 * @interface UsersTableRow
 * @property {number} id - The unique identifier of the user.
 * @property {string} name - The name of the user.
 * @property {string} email - The email address of the user.
 * @property {UserRole} userType - The role or type of the user (e.g., Admin, Technician).
 */
export interface UsersTableRow {
  id: number;
  name: string;
  email: string;
  userType: UserRole;
}
