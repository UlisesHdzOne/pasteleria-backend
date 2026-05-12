import { CreateAddressDto } from '../dto/create-address.dto';
import { UpdateAddressDto } from '../dto/update-address.dto';
import { Prisma } from '@prisma/client';

export class AddressMapper {
  static readonly SELECT: Prisma.AddressSelect = {
    id: true,
    street: true,
    city: true,
    state: true,
    postalCode: true,
    isDefault: true,
    customerId: true,
    createdAt: true,
    updatedAt: true,
  };

  static toCreate(customerId: string, data: CreateAddressDto): Prisma.AddressCreateInput {
    return {
      street: data.street.trim(),
      city: data.city.trim(),
      state: data.state.trim(),
      postalCode: data.postalCode.trim(),
      isDefault: data.isDefault || false,
      customer: {
        connect: { id: customerId },
      },
    };
  }

  static toUpdate(data: UpdateAddressDto): Prisma.AddressUpdateInput {
    const update: Prisma.AddressUpdateInput = {};

    if (data.street !== undefined) update.street = data.street.trim();
    if (data.city !== undefined) update.city = data.city.trim();
    if (data.state !== undefined) update.state = data.state.trim();
    if (data.postalCode !== undefined) update.postalCode = data.postalCode.trim();
    if (data.isDefault !== undefined) update.isDefault = data.isDefault;

    return update;
  }
}
