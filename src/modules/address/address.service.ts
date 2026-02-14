import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddressResponse } from './type/address.response';
import { CustomerService } from '../customer/customer.service';
import { Address } from '@prisma/client';

@Injectable()
export class AddressService {
  private readonly MAX_ADDRESSES = 3;

  constructor(
    private readonly prisma: PrismaService,
    private readonly customerService: CustomerService,
  ) {}

  private mapToResponse(address: Address): AddressResponse {
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

  private async findAddressOrFail(addressId: string, customerId: string) {
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
    return address;
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
    return this.mapToResponse(address);
  }

  async setDefaultAddress(
    customerId: string,
    addressId: string,
  ): Promise<AddressResponse> {
    await this.customerService.ensureCustomerExists(customerId);

    const updated = await this.prisma.$transaction(async (tx) => {
      await tx.address.updateMany({
        where: { customerId },
        data: { isDefault: false },
      });

      const result = await tx.address.updateMany({
        where: { id: addressId, customerId },
        data: { isDefault: true },
      });

      if (result.count === 0) {
        throw new NotFoundException({
          code: 'ADDRESS_NOT_FOUND',
          message: `La dirección no existe o no pertenece al cliente`,
        });
      }

      return tx.address.findFirstOrThrow({
        where: { id: addressId, customerId },
      });
    });

    return this.mapToResponse(updated);
  }

  async getAddressById(
    customerId: string,
    addressId: string,
  ): Promise<AddressResponse> {
    await this.customerService.ensureCustomerExists(customerId);

    const address = await this.findAddressOrFail(addressId, customerId);

    return this.mapToResponse(address);
  }
}
