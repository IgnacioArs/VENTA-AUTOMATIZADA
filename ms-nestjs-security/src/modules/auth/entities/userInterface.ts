import { UserEntity } from "src/modules/users/entities/user.entity";

export interface AuthResponse {
  user: UserEntity;
  token: string;
}
