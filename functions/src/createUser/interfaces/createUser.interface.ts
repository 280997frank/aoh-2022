import { RoleType } from "../../types/role.type";

export interface CreateUser {
  email: string;
  firstName: string;
  lastName: string;
  role: RoleType;
  code: string;
  password: string;
}
