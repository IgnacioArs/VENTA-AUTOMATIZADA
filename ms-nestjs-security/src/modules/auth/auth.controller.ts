import { Controller, Post, Body, UseGuards} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UserEntity } from '../users/entities/user.entity';
import { ApiBearerAuth, ApiBody, ApiOperation,ApiTags } from '@nestjs/swagger';
import { LoginAuthDto } from './dto/login-auth.dto';
import { AuthResponse } from './entities/userInterface';
import { JwtAuthGuard } from './jwt-auth.guard';


/* @ApiBearerAuth() AQUI NO SE USA */
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}


  @Post('/registro')
  @ApiOperation({
    summary: 'Crear registro de usuario',
  })
  @ApiBody({ type: CreateAuthDto })
  async registerAuth(@Body() createAuthDto: CreateAuthDto): Promise<UserEntity> {
    return this.authService.createAuth(createAuthDto);
  }


 /*  @UseGuards(JwtAuthGuard) AQUI NO SE USA */
  @Post('/login')
  @ApiOperation({
    summary: 'Genara autenticacion de usuario',
  })
  @ApiBody({ type: LoginAuthDto })
  async  loginAuth(@Body() loginAuthDto: LoginAuthDto): Promise<AuthResponse> {
    return this.authService.authLogin(loginAuthDto);
  }


}
