import { CreateAuthDto } from './dto/create-auth.dto';
import { UserEntity } from '../users/entities/user.entity';
import { LoginAuthDto } from './dto/login-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { AuthResponse } from './entities/userInterface';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
export declare class AuthService {
    private readonly jwtService;
    private readonly httpservice;
    private readonly configService;
    constructor(jwtService: JwtService, httpservice: HttpService, configService: ConfigService);
    createAuth(createAuthDto: CreateAuthDto): Promise<UserEntity>;
    authLogin(LoginAuthDto: LoginAuthDto): Promise<AuthResponse>;
}
