import {
  IsString,
  IsEmail,
  IsOptional,
  MinLength,
  MaxLength,
  IsUrl,
  Matches,
} from 'class-validator';

export class UpdateCustomerDto {
  @IsString()
  @IsOptional()
  @MinLength(1, { message: 'El nombre no puede estar vacío' })
  firstName?: string;

  @IsString()
  @IsOptional()
  @MinLength(1, { message: 'El apellido no puede estar vacío' })
  lastName?: string;

  @IsString()
  @Matches(/^[0-9]+$/, {
    message: 'El teléfono solo debe contener números',
  })
  @IsOptional()
  @MinLength(10, { message: 'El teléfono debe tener al menos 10 dígitos' })
  @MaxLength(15, { message: 'El teléfono no puede tener más de 15 dígitos' })
  phone?: string;

  @IsEmail({}, { message: 'Debe ser un email válido' })
  @IsOptional()
  email?: string;

  @IsUrl({}, { message: 'Debe ser una URL válida' })
  @IsOptional()
  avatar?: string;
}
