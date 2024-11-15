import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UserEntity } from '../users/entities/user.entity';
import { LoginAuthDto } from './dto/login-auth.dto';
import { AuthResponse } from './entities/userInterface';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    registerAuth(createAuthDto: CreateAuthDto): Promise<UserEntity>;
    loginAuth(loginAuthDto: LoginAuthDto): Promise<AuthResponse>;
}
