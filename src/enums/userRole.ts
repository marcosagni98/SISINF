export enum UserRole {
    User,
    Technician,
    Administrator
}

export const userRoleMap = new Map([
    [UserRole.User, "Usuario"],
    [UserRole.Technician, "Técnico"],
    [UserRole.Administrator, "Administrador"],
  ]);
  