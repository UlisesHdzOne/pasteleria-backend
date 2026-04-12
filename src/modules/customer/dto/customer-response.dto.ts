import { Customer } from '@prisma/client';
import { Exclude, Expose, Transform } from 'class-transformer';
import { buildFullName } from '../utils/customer.utils';

type CustomerName = Pick<Customer, 'firstName' | 'lastName'>;

@Exclude() 
export class CustomerResponseDto {
  @Expose() 
  id!: string;

  @Expose()
  @Transform(({ obj }: { obj: CustomerName }) => buildFullName(obj))
  fullName!: string; 

  @Expose()
  phone!: string;

  @Expose()
  email!: string | null;

  @Expose()
  createdAt!: Date;

  @Expose()
  updatedAt!: Date;

}
