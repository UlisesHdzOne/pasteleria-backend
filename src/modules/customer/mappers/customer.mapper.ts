import { CreateCustomerDto } from '../dto/create-customer.dto';
import { Prisma } from '@prisma/client';

export class CustomerMapper {
  // Constante en lugar de método — no tiene estado ni lógica
  static readonly SELECT: Prisma.CustomerSelect = {
    id: true,
    firstName: true,
    lastName: true,
    phone: true,
    email: true,
    createdAt: true,
    updatedAt: true,
  };

  static toCreate(data: CreateCustomerDto): Prisma.CustomerCreateInput {
    return {
      firstName: data.firstName.trim(),
      lastName: data.lastName.trim(),
      phone: data.phone.replace(/\D/g, ''),
      email: data.email || null,
      avatar: data.avatar || null,
    };
  }
}