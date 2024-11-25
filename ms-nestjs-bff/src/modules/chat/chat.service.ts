import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ChatBotService {
  constructor(
    private readonly httpservice:HttpService,
    private readonly configService: ConfigService,
  ) {}

  // Obtener todos los usuarios
  async chatBot(message:string){
    const ms = this.configService.get<string>('msPython');

    try {
      const getUsuariosAll = await this.httpservice.axiosRef.get(
        `${ms}/api/chat-bot`,
        {
          params: {
              message: message // Enviar el parámetro de consulta correctamente
          }
      }
      );
      
  
      return getUsuariosAll.data;
  
    } catch (error) {
      // Captura errores de Axios o problemas con la creación de usuario
      throw new HttpException(
        error.response?.data?.message || 'Error al obtener la conversacion con la ia',
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
 
}

