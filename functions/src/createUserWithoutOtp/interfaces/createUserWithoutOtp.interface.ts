import { RoleType } from "../../types/role.type";

export interface CreateUserWithoutOtp {
  email: string;
  firstName: string;
  lastName: string;
  role: RoleType;
  password: string;
}
