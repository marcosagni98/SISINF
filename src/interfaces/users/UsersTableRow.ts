import { UserRole } from "../../enums/userRole";
/**
 * Interface representing a row of user data in a table
 * @interface UsersTableRow
 * @property {number} id - The unique identifier of the user
 * @property {string} name - The full name of the user
 * @property {string} email - The email address associated with the user account
 * @property {UserRole} userType - The role or type of the user, represented by the `UserRole` enum
 */

export interface UsersTableRow {
  id: number;
  name: string;
  email: string;
  userType: UserRole;
}
