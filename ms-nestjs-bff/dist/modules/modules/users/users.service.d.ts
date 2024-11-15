import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
export declare class UsersService {
    private readonly httpservice;
    private readonly configService;
    constructor(httpservice: HttpService, configService: ConfigService);
    findAll(token: string): Promise<UserEntity[]>;
    findOne(id: number, token: string): Promise<UserEntity[]>;
    update(id: number, updateUserDto: CreateUserDto, token: string): Promise<UserEntity[]>;
    remove(id: number, token: string): Promise<void>;
}
