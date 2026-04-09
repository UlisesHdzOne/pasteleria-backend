import { BaseQueryDto } from 'src/common/dto/base-query.dto';
import { IsOptional, IsString } from 'class-validator';

export class FindCustomerQueryDto extends BaseQueryDto {
  @IsOptional()
  @IsString()
  status?: 'active' | 'inactive';
}
