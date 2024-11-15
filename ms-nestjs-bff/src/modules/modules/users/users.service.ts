import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {
  constructor(
    private readonly httpservice:HttpService,
    private readonly configService: ConfigService,
  ) {}



  // Obtener todos los usuarios
  async findAll(token:string): Promise<UserEntity[]> {
    const ms = this.configService.get<string>('msSecurity');

    try {
      const getUsuariosAll = await this.httpservice.axiosRef.get<UserEntity[]>(
        `${ms}/users`,
        {
          headers: {
            Authorization: `Bearer ${token}`,  // Añadiendo el token en los encabezados
          },
        }
      );
      
      return getUsuariosAll.data;
  
    } catch (error) {
      // Captura errores de Axios o problemas con la creación de usuario
      throw new HttpException(
        error.response?.data?.message || 'Error al crear el usuario',
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  // Obtener un usuario por ID
  async findOne(id: number,token:string): Promise<UserEntity[]> {
    const ms = this.configService.get<string>('msSecurity');

    try {
      const getUserById = await this.httpservice.axiosRef.get<UserEntity[]>(
        `${ms}/users/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,  // Añadiendo el token en los encabezados
          },
        }
      );
  
      return getUserById.data;
  
    } catch (error) {
      // Captura errores de Axios o problemas con la creación de usuario
      throw new HttpException(
        error.response?.data?.message || 'Error al crear el usuario',
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  // Actualizar un usuario por ID
  async update(id: number, updateUserDto: CreateUserDto,token:string): Promise<UserEntity[]> {
    const ms = this.configService.get<string>('msSecurity');

    try {
      const getUserById = await this.httpservice.axiosRef.put<UserEntity[]>(
        `${ms}/users/${id}`,updateUserDto,
        {
          headers: {
            Authorization: `Bearer ${token}`,  // Añadiendo el token en los encabezados
          },
        }
      );
  
      return getUserById.data;
  
    } catch (error) {
      // Captura errores de Axios o problemas con la creación de usuario
      throw new HttpException(
        error.response?.data?.message || 'Error al crear el usuario',
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  // Eliminar un usuario por ID
  async remove(id: number,token:string): Promise<void> {
    const ms = this.configService.get<string>('msSecurity');

    try {
      const getUserById = await this.httpservice.axiosRef.delete(
        `${ms}/users/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,  // Añadiendo el token en los encabezados
          },
        }
      );
  
      return getUserById.data;
  
    } catch (error) {
      // Captura errores de Axios o problemas con la creación de usuario
      throw new HttpException(
        error.response?.data?.message || 'Error al crear el usuario',
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  
  }
 
}

