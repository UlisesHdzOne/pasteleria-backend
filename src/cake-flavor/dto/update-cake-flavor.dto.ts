import { PartialType } from '@nestjs/mapped-types';
import { CreateCakeFlavorDto } from './create-cake-flavor.dto';

export class UpdateCakeFlavorDto extends PartialType(CreateCakeFlavorDto) {}
