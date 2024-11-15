import { CreateAuthDto } from './dto/create-auth.dto';
import { UserEntity } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import { LoginAuthDto } from './dto/login-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { AuthResponse } from './entities/userInterface';
export declare class AuthService {
    private readonly usersRepository;
    private readonly jwtService;
    constructor(usersRepository: Repository<UserEntity>, jwtService: JwtService);
    createAuth(CreateAuthDto: CreateAuthDto): Promise<UserEntity>;
    authLogin(LoginAuthDto: LoginAuthDto): Promise<AuthResponse>;
}
