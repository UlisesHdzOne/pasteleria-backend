import { Address } from '@prisma/client';
import { Exclude, Expose, Transform } from 'class-transformer';

@Exclude()
export class AddressResponseDto {
  @Expose()
  id!: string;

  @Expose()
  street!: string;

  @Expose()
  city!: string;

  @Expose()
  state!: string;

  @Expose()
  postalCode!: string;

  @Expose()
  isDefault!: boolean;

  @Expose()
  customerId!: string;

  @Expose()
  @Transform(({ value }) => value.toISOString())
  createdAt!: string;

  @Expose()
  @Transform(({ value }) => value.toISOString())
  updatedAt!: string;
}
