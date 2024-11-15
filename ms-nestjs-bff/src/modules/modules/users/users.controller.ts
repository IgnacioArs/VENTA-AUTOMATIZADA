import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';


@ApiBearerAuth()
@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}


  // Obtener todos los usuarios
  @UseGuards(JwtAuthGuard)
  @Get('/obtener-usuarios/:token')
  @ApiOperation({ summary: 'Devuelve todos los usuarios' })
  @ApiParam({
    name: 'token',
    description: 'Código único token.',
  })
  async findAll(@Param('token') token: string,): Promise<UserEntity[]> {
    return this.usersService.findAll(token);
  }

  // Obtener un usuario por ID
  @UseGuards(JwtAuthGuard)
  @Get('/:id/:token')
  @ApiOperation({ summary: 'Devuelve un usuario por ID' })
  @ApiParam({
    name: 'id',
    description: 'Código único id.',
  })
  @ApiParam({
    name: 'token',
    description: 'Código único token.',
  })
  async findOne(@Param('id') id: number,@Param('token') token: string): Promise<UserEntity[]> {
    return this.usersService.findOne(id,token);
  }

  // Actualizar un usuario por ID
  @UseGuards(JwtAuthGuard)
  @Put('/:id/:token')
  @ApiOperation({ summary: 'Actualiza un usuario por ID' })
  @ApiParam({
    name: 'id',
    description: 'Código único id.',
  })
  @ApiParam({
    name: 'token',
    description: 'Código único token.',
  })
  async update(@Param('id') id: number, @Body() createUserDto: CreateUserDto,@Param('token') token: string): Promise<UserEntity[]> {
    const usuarioUpdate = await this.usersService.update(id,createUserDto,token);
    return 
  }

  // Eliminar un usuario por ID
  @UseGuards(JwtAuthGuard)
  @Delete('/:id/:token')
  @ApiOperation({ summary: 'Elimina un usuario por ID' })
  @ApiParam({
    name: 'id',
    description: 'Código único id.',
  })
  @ApiParam({
    name: 'token',
    description: 'Código único token.',
  })
  async remove(@Param('id') id: number,@Param('token') token: string): Promise<void> {
    return this.usersService.remove(id,token);
  }
}

