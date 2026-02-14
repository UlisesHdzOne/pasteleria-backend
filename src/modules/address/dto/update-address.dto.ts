import { PartialType } from '@nestjs/mapped-types';
import { CreateAddressDto } from './create-address.dto';

export class UpdateAddressDto {
  street?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  isDefault: boolean;
}
