import { IsInt, Min } from 'class-validator';
export class CreateCakeSizeDto {
  @IsInt()
  @Min(1)
  people!: number;
}