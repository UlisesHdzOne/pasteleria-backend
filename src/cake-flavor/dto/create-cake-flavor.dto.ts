import { IsString, IsNotEmpty } from 'class-validator';

export class CreateCakeFlavorDto {
  @IsString()
  @IsNotEmpty()
  name!: string;
}
