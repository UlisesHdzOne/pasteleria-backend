import { Expose, Transform } from 'class-transformer';

export class CreateCustomerResponseDto {
  @Expose()
  id!: string;

  @Expose()
  @Transform(({ obj }) => `${obj.firstName} ${obj.lastName}`)
  fullName!: string;

  @Expose()
  phone!: string;

  @Expose()
  email!: string | null;

  @Expose()
  @Transform(({ obj }) => ({
    raw: obj.createdAt,
    formatted: new Date(obj.createdAt).toLocaleDateString('es-MX', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }),
  }))
  createdAt!: { raw: Date; formatted: string };
}