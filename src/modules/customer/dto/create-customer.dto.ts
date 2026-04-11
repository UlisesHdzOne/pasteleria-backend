// dto/create-customer.dto.ts  (nombre del archivo)
import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  MinLength,
  MaxLength,
  IsUrl,
  Matches,
} from 'class-validator';

export class CreateCustomerDto {
  // ← Clase sigue siendo PascalCase
  @IsString()
  @IsNotEmpty({ message: 'El nombre es requerido' })
  firstName!: string;

  @IsString()
  @IsNotEmpty({ message: 'El apellido es requerido' })
  lastName!: string;

  @IsString()
  @IsString()
  @Matches(/^[0-9]+$/, {
    message: 'El teléfono solo debe contener números',
  })
  @IsNotEmpty({ message: 'El teléfono es requerido' })
  @MinLength(10, { message: 'El teléfono debe tener al menos 10 dígitos' })
  @MaxLength(15, { message: 'El teléfono no puede tener más de 15 dígitos' })
  phone!: string;

  @IsEmail({}, { message: 'Debe ser un email válido' })
  @IsOptional()
  email?: string;

  @IsUrl({}, { message: 'Debe ser una URL válida' })
  @IsOptional()
  avatar?: string;
}
