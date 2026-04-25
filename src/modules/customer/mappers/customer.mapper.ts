import { CreateCustomerDto } from '../dto/create-customer.dto';
import { UpdateCustomerDto } from '../dto/update-customer.dto';
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
    deletedAt: true,
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

  static toUpdate(data: UpdateCustomerDto): Prisma.CustomerUpdateInput {
    return {
      firstName: data.firstName?.trim(),
      lastName: data.lastName?.trim(),
      phone: data.phone?.replace(/\D/g, ''),
      email: data.email ?? null,
      avatar: data.avatar ?? null,
    };
  }
}