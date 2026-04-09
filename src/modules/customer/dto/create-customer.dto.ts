import { IsNotEmpty, IsString, Length, Matches } from 'class-validator';

export class CreateCustomerDto {
  @IsString()
  @IsNotEmpty()
  @Length(2, 50)
  firstName!: string;

  @IsString()
  @IsNotEmpty()
  @Length(2, 50)
  lastName!: string;

  @IsString()
  @IsNotEmpty()
  @Length(10, 15)
  @Matches(/^\d+$/, { message: 'El teléfono solo debe contener números' })
  phone!: string;
}
