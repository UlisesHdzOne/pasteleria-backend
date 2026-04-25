import { Exclude, Expose, Transform } from 'class-transformer';
import { Customer } from '@prisma/client';
import { buildFullName } from '../utils/customer.utils';

type CustomerCreate = Pick<Customer, 'firstName' | 'lastName' | 'createdAt'>;

@Exclude()
export class CreateCustomerResponseDto {
  @Expose()
  id!: string;

  @Expose()
  @Transform(({ obj }: { obj: CustomerCreate }) => buildFullName(obj))
  fullName!: string;

  @Expose()
  phone!: string;

  @Expose()
  email!: string | null;

  @Expose()
  @Transform(({ obj }: { obj: CustomerCreate }) => {
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
