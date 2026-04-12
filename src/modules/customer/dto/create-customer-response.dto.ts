import { Expose, Transform } from 'class-transformer';
import { Customer } from '@prisma/client';

type CustomerRaw = Pick<Customer, 'firstName' | 'lastName' | 'createdAt'>;

export class CreateCustomerResponseDto {
  @Expose()
  id!: string;

  @Expose()
  @Transform(({ obj }: { obj: CustomerRaw }) =>
    [obj.firstName, obj.lastName].filter(Boolean).join(' '),
  )
  fullName!: string;

  @Expose()
  phone!: string;

  @Expose()
  email!: string | null;

  @Expose()
  @Transform(({ obj }: { obj: CustomerRaw }) => {
    const date = new Date(obj.createdAt);

    return {
      raw: date,
      formatted: date.toLocaleDateString('es-MX', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
    };
  })
  createdAt!: { raw: Date; formatted: string };
}
