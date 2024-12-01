import { UserEntity } from "../../users/entities/user.entity";
export interface AuthResponse {
  user: UserEntity;
  tokenSecurity: string;
  token: string;
}
