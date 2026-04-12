import { Transform } from 'class-transformer';
import {
  IsOptional,
  IsString,
  IsNumber,
  IsIn,
  IsDateString,
} from 'class-validator';

export class FindCustomerQueryDto {
  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsNumber()
  page: number = 1;

  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsNumber()
  limit: number = 10;

  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsIn(['active', 'deleted', 'all'])
  status?: 'active' | 'deleted' | 'all';

  @IsOptional()
  @IsIn(['firstName', 'lastName', 'createdAt'])
  sortBy?: 'firstName' | 'lastName' | 'createdAt';

  @IsOptional()
  @IsIn(['asc', 'desc'])
  sortOrder?: 'asc' | 'desc';

  @IsOptional()
  @IsDateString()
  createdFrom?: string;

  @IsOptional()
  @IsDateString()
  createdTo?: string;
}
