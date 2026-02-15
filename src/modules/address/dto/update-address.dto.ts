import { IsOptional, IsString, Length } from 'class-validator';

export class UpdateAddressDto {
  @IsOptional()
  @IsString()
  @Length(2, 50)
  street?: string;

  @IsOptional()
  @IsString()
  @Length(2, 50)
  city?: string;

  @IsOptional()
  @IsString()
  @Length(2, 50)
  state?: string;

  @IsOptional()
  @IsString()
  @Length(2, 50)
  postalCode?: string;
}
