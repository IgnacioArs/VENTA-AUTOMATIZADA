import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';
import { IsString, IsEmail, MinLength, MaxLength, IsNotEmpty } from 'class-validator';

@Entity('users')
export class UserEntity {
  
  @PrimaryGeneratedColumn()  // Hace que el campo id sea autoincrementable
  id: number;

  @Column()
  @IsString()
  @IsNotEmpty()
  @MinLength(3, { message: 'El nombre debe tener al menos 3 caracteres' })
  @MaxLength(20, { message: 'El nombre no puede tener más de 20 caracteres' })
  name: string;

  @Column({ unique: true })  // Aquí se agrega la restricción de unicidad directamente en la columna
  @IsEmail({}, { message: 'Debe ser un correo electrónico válido' })
  @IsNotEmpty()
  email: string;

  @Column()
  @IsString()
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  password: string;
}


