import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UserEntity } from '../users/entities/user.entity';
import { LoginAuthDto } from './dto/login-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { AuthResponse } from './entities/userInterface';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly httpservice:HttpService,
    private readonly configService: ConfigService,
  ) {}


 // Crear un nuevo usuario
async createAuth(createAuthDto: CreateAuthDto): Promise<UserEntity> {
  const { name, email, password } = createAuthDto;

  const nuevoUsuario = {
    name: name,
    email: email,
    password: password,
  };

  const ms = this.configService.get<string>('msSecurity');

  try {
    const registro = await this.httpservice.axiosRef.post<UserEntity>(
      `${ms}/auth/registro`,
      nuevoUsuario
    );

    if (!registro.data) {
      throw new HttpException(
        'CONFLICT',
        HttpStatus.CONFLICT,
        {
          cause: new Error('Error usuario ya existe'),
        }
      );
    }

    return registro.data;

  } catch (error) {
    // Captura errores de Axios o problemas con la creación de usuario
    throw new HttpException(
      error.response?.data?.message || 'Error al crear el usuario',
      error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR
    );
  }
}


  // Obtener un usuario por ID
  async authLogin(LoginAuthDto: LoginAuthDto): Promise<AuthResponse> {
     const { email, password } = LoginAuthDto; 
    
     const nuevoUsuario = {
      email: email,
      password: password,
      };

     const ms = this.configService.get<string>('msSecurity');

     try {
        const loginUsuario = await this.httpservice.axiosRef.post(
          `${ms}/auth/login`,
          nuevoUsuario
        );


        const payload = {
          id: loginUsuario.data.user.id,
          name: loginUsuario.data.user.name
        };
      
        const token = this.jwtService.sign(payload);
        const userResponse: AuthResponse = {
          user: loginUsuario.data.user,
          tokenSecurity:loginUsuario.data.token,
          token: token,
        };
        
        /* const token = this.jwtService.sign(payload); */
        return userResponse;


     } catch (error) {
      throw new HttpException('CONFLICT', HttpStatus.CONFLICT, {
        cause: new Error('El Usuario encontrado'),
      });
     }
  }

}
