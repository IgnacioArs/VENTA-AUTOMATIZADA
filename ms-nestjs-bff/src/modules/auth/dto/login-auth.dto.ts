import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class LoginAuthDto {
    @ApiProperty({
        description: 'Correo electrónico del usuario',
        example: 'juan@example.com',
    })
    @IsEmail({}, { message: 'Debe ser un correo electrónico válido' })
    @IsNotEmpty()
    email: string;

    @ApiProperty({
        description: 'Contraseña del usuario',
        minLength: 6,
        example: '123456',
    })
    @IsString()
    @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
    password: string;
}

