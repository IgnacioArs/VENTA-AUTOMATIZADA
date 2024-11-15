import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UserEntity } from '../users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { LoginAuthDto } from './dto/login-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { AuthResponse } from './entities/userInterface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService
  ) {}


  // Crear un nuevo usuario
  async createAuth(CreateAuthDto: CreateAuthDto): Promise<UserEntity> {
      const {name,email,password} = CreateAuthDto;

      const saltOrRounds = 10;
      const hash = await bcrypt.hash(password, saltOrRounds);
      const nuevoUsuario = {
        name:name,
        email:email,
        password:hash
      }
      const usuarioRegistrado = await this.usersRepository.save(nuevoUsuario);
        
      console.log(usuarioRegistrado);
      return usuarioRegistrado
  }

  // Obtener un usuario por ID
  async authLogin(LoginAuthDto: LoginAuthDto): Promise<AuthResponse> {
    const { email, password } = LoginAuthDto;
    
    const userFind = await this.usersRepository.findOne({ where: { email } });
  
    if (!userFind) {
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND, {
        cause: new Error('Email usuario encontrado'),
      });
    }
  
    const passwordValidada = await bcrypt.compare(password, userFind.password);
    if (!passwordValidada) {
      throw new HttpException('FORBIDDEN', HttpStatus.FORBIDDEN, {
        cause: new Error('Password usuario no encontrada'),
      });
    }
  
    const payload = {
      id: userFind.id,
      name: userFind.name,
    };
  
    const token = this.jwtService.sign(payload);
    const userResponse: AuthResponse = {
      user: userFind,
      token: token,
    };
  
    return userResponse;
  }

}
