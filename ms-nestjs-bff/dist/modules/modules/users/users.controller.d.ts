import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findAll(token: string): Promise<UserEntity[]>;
    findOne(id: number, token: string): Promise<UserEntity[]>;
    update(id: number, createUserDto: CreateUserDto, token: string): Promise<UserEntity[]>;
    remove(id: number, token: string): Promise<void>;
}
