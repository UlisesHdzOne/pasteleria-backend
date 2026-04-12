import { IsOptional, IsString, IsIn, IsDateString } from 'class-validator';
import { Type } from 'class-transformer';

export class FindCustomerQueryDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsIn(['active', 'deleted', 'all'])
  status?: 'active' | 'deleted' | 'all' = 'active';

  @IsOptional()
  @IsDateString()
  createdFrom?: string;

  @IsOptional()
  @IsDateString()
  createdTo?: string;

  @IsOptional()
  @IsIn(['firstName', 'lastName', 'createdAt'])
  sortBy?: 'firstName' | 'lastName' | 'createdAt';

  @IsOptional()
  @IsIn(['asc', 'desc'])
  sortOrder?: 'asc' | 'desc' = 'desc';

  @IsOptional()
  @Type(() => Number)
  page: number = 1;

  @IsOptional()
  @Type(() => Number)
  limit: number = 10;
}