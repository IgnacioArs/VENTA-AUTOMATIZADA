import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../users/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
/* import { JwtStrategy } from './jwt.strategy'; AQUI NO SE USA*/

@Module({
  /*   export class Auth {}  NO LO USAREMOS*/
  imports: [
    ConfigModule,  // Asegura que ConfigModule esté importado
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '30m' },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService]
  /* providers: [AuthService,JwtStrategy], AQUI NO USA */
})
export class AuthModule {}
