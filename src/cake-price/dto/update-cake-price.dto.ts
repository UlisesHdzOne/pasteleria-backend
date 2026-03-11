import { PartialType } from '@nestjs/mapped-types';
import { CreateCakePriceDto } from './create-cake-price.dto';

export class UpdateCakePriceDto extends PartialType(CreateCakePriceDto) {}
