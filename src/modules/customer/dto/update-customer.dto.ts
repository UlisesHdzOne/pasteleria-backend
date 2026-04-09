import { IsNotEmpty, IsOptional, IsString, Length, Matches } from 'class-validator';

export class UpdateCustomerDto {
  @IsString()
  @IsNotEmpty()
  @Length(2, 50)
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsNotEmpty()
  @Length(2, 50)
  @IsOptional()
  lastName?: string;

  @IsString()
  @IsNotEmpty()
  @Length(10, 15)
  @Matches(/^\d+$/, { message: 'El teléfono solo debe contener números' })
  @IsOptional()
  phone?: string;
}
