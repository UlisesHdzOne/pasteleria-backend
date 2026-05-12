import {
  IsString,
  IsOptional,
  IsBoolean,
  MinLength,
  MaxLength,
} from 'class-validator';

export class UpdateAddressDto {
  @IsString()
  @IsOptional()
  @MinLength(5, { message: 'La calle debe tener al menos 5 caracteres' })
  @MaxLength(100, { message: 'La calle no puede tener más de 100 caracteres' })
  street?: string;

  @IsString()
  @IsOptional()
  @MinLength(2, { message: 'La ciudad debe tener al menos 2 caracteres' })
  @MaxLength(50, { message: 'La ciudad no puede tener más de 50 caracteres' })
  city?: string;

  @IsString()
  @IsOptional()
  @MinLength(2, { message: 'El estado debe tener al menos 2 caracteres' })
  @MaxLength(50, { message: 'El estado no puede tener más de 50 caracteres' })
  state?: string;

  @IsString()
  @IsOptional()
  @MinLength(5, { message: 'El código postal debe tener al menos 5 caracteres' })
  @MaxLength(10, { message: 'El código postal no puede tener más de 10 caracteres' })
  postalCode?: string;

  @IsBoolean()
  @IsOptional()
  isDefault?: boolean;
}
