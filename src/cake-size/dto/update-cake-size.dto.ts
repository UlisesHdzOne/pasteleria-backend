import { PartialType } from '@nestjs/mapped-types';
import { CreateCakeSizeDto } from './create-cake-size.dto';

export class UpdateCakeSizeDto extends PartialType(CreateCakeSizeDto) {}
