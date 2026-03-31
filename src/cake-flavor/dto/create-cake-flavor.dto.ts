import { IsString, IsNotEmpty, IsOptional, Matches } from 'class-validator';

export class CreateCakeFlavorDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  @Matches(/^#([0-9A-Fa-f]{6})$/, {
    message: 'Color must be a valid hex code, e.g. #FF5733',
  })
  color?: string;
}
