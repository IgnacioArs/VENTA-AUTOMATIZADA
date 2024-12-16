import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
/* import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../users/entities/user.entity'; */
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
/* import { JwtStrategy } from './jwt.strategy'; AQUI NO SE USA*/

@Module({
  /*   export class Auth {}  NO LO USAREMOS*/
  imports: [
    ConfigModule,  // Asegura que ConfigModule esté importado
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '30m' },
      }),
    }),
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService]
  /* providers: [AuthService,JwtStrategy], AQUI NO USA */
})
export class AuthModule {}
