import { IsInt, Min, IsString, IsOptional } from 'class-validator';

export class CreateCakeSizeDto {
  @IsString()
  name!: string;

  @IsInt()
  @Min(1)
  people!: number;

  @IsOptional()
  @IsString()
  description?: string;
}
