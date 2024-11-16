import { Module } from '@nestjs/common';
/* import { TypeOrmModule } from '@nestjs/typeorm'; */ // Asegúrate de tener TypeOrmModule importado
import { ChatBotController } from './chat.controller';
import { ChatBotService } from './chat.service';
/* import { UserEntity } from './entities/user.entity';  */// La entidad de usuario
import { HttpModule } from '@nestjs/axios';
import { JwtStrategy } from '../auth/jwt.strategy';

@Module({
  imports:[
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  controllers: [ChatBotController],
  providers: [ChatBotService,JwtStrategy],
})
export class ChatBotModule {}

