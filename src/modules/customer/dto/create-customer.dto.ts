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
  @IsString()
  @IsNotEmpty({ message: 'El nombre es requerido' })
  firstName!: string;

  @IsString()
  @IsNotEmpty({ message: 'El apellido es requerido' })
  lastName!: string;

  @IsString()
  @Matches(/^\(?\d{2,3}\)?[\s\-]?\d{3,4}[\s\-]?\d{4}$/, {
    message: 'El teléfono debe tener un formato válido (ej: (555) 123-4567, 555-123-4567, 5551234567)',
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