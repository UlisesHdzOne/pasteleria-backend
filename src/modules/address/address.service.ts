import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddressResponse } from './type/address.response';
import { CustomerService } from '../customer/customer.service';

@Injectable()
export class AddressService {
  private readonly MAX_ADDRESSES = 3;

  constructor(
    private readonly prisma: PrismaService,
    private readonly customerService: CustomerService,
  ) {}

  private async ensureAddressExists(addressId: string, customerId: string) {
    const address = await this.prisma.address.findFirst({
      where: {
        id: addressId,
        customerId,
      },
    });

    if (!address) {
      throw new NotFoundException({
        code: 'ADDRESS_NOT_FOUND',
        message: `La dirección no existe o no pertenece al cliente`,
      });
    }
  }

  async createAddress(
    customerId: string,
    createAddressDto: CreateAddressDto,
  ): Promise<AddressResponse> {
    await this.customerService.ensureCustomerExists(customerId);

    const totalAddresses = await this.prisma.address.count({
      where: { customerId },
    });

    if (totalAddresses >= this.MAX_ADDRESSES) {
      throw new ConflictException({
        code: 'ADDRESS_LIMIT_REACHED',
        message: `El cliente ya tiene el máximo de ${this.MAX_ADDRESSES} direcciones permitidas`,
      });
    }

    const address = await this.prisma.address.create({
      data: {
        ...createAddressDto,
        isDefault: totalAddresses === 0,
        customer: {
          connect: { id: customerId },
        },
      },
    });
    return {
      id: address.id,
      street: address.street,
      city: address.city,
      state: address.state,
      postalCode: address.postalCode,
      isDefault: address.isDefault,
      createdAt: address.createdAt,
    };
  }

  async setDefaultAddress(
    customerId: string,
    addressId: string,
  ): Promise<AddressResponse> {
    await this.customerService.ensureCustomerExists(customerId);
    await this.ensureAddressExists(addressId, customerId);

    const updated = await this.prisma.$transaction(async (tx) => {
      await tx.address.updateMany({
        where: { customerId },
        data: { isDefault: false },
      });

      return tx.address.update({
        where: { id: addressId },
        data: { isDefault: true },
      });
    });

    return {
      id: updated.id,
      street: updated.street,
      city: updated.city,
      state: updated.state,
      postalCode: updated.postalCode,
      isDefault: updated.isDefault,
      createdAt: updated.createdAt,
    };
  }


}
