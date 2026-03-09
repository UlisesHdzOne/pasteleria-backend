import { IsString, IsNumber, Min } from 'class-validator';

export class CreateCakePriceDto {
  @IsString()
  flavorId!: string;

  @IsString()
  sizeId!: string;

  @IsNumber()
  @Min(0)
  price!: number;
}
