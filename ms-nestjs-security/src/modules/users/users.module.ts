import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // Asegúrate de tener TypeOrmModule importado
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserEntity } from './entities/user.entity'; // La entidad de usuario
import { JwtStrategy } from '../auth/jwt.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])], // Importa la entidad para que pueda ser utilizada
  controllers: [UsersController],
  providers: [UsersService,JwtStrategy],
})
export class UsersModule {}

