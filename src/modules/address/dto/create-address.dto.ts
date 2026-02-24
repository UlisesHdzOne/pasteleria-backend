import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateAddressDto {
  @IsString()
  @IsNotEmpty()
  @Length(2, 50)
  street!: string;

  @IsString()
  @IsNotEmpty()
  @Length(2, 50)
  city!: string;

  @IsString()
  @IsNotEmpty()
  @Length(2, 50)
  state!: string;

  @IsString()
  @IsNotEmpty()
  @Length(2, 50)
  postalCode!: string;
}
