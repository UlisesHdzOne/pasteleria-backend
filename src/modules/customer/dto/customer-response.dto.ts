import { Exclude, Expose, Transform } from 'class-transformer';

@Exclude()
export class CustomerResponseDto {
  @Expose()
  id!: string;

  @Expose()
  firstName!: string;

  @Expose()
  lastName!: string;

  @Expose()
  phone!: string;

  @Expose()
  email!: string | null;

  @Expose()
  avatar!: string | null;

  @Expose()
  @Transform(({ value }) => value.toISOString())
  createdAt!: string;

  @Expose()
  @Transform(({ value }) => value.toISOString())
  updatedAt!: string;

  @Expose()
  @Transform(({ value }) => value ? value.toISOString() : null)
  deletedAt!: string | null;
}
