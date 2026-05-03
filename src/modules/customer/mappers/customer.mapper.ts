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
    avatar: true,
    createdAt: true,
    updatedAt: true,
    deletedAt: true,
  };

  static toCreate(data: CreateCustomerDto): Prisma.CustomerCreateInput {
    return {
      firstName: data.firstName.trim(),
      lastName: data.lastName.trim(),
      phone: data.phone.replace(/\D/g, ''),
      email: data.email ?? null,
      avatar: data.avatar ?? null,
    };
  }

  static toUpdate(data: UpdateCustomerDto): Prisma.CustomerUpdateInput {
    const update: Prisma.CustomerUpdateInput = {};

    if (data.firstName !== undefined) update.firstName = data.firstName.trim();
    if (data.lastName !== undefined) update.lastName = data.lastName.trim();

    if (typeof data.phone === 'string' && data.phone.trim().length > 0) {
      update.phone = data.phone.replace(/\D/g, '');
    }

    if (data.email !== undefined) update.email = data.email;
    if (data.avatar !== undefined) update.avatar = data.avatar;

    return update;
  }

}