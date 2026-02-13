import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

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
  @IsOptional()
  phone?: string;
}
