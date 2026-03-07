import { UpdateAddressDto } from './dto/update-address.dto';
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

  private async findAddressOrFail(
    addressId: string,
    customerId: string,
  ): Promise<Address> {
    const address = await this.prisma.address.findFirst({
      where: {
        id: addressId,
        customerId,
      },
    });

    if (!address) {
      throw new NotFoundException({
        code: 'ADDRESS_NOT_FOUND',
        message: 'La dirección no existe o no pertenece al cliente',
      });
    }

    return address;
  }

  async createAddress(
    customerId: string,
    createAddressDto: CreateAddressDto,
  ): Promise<AddressResponse> {
    await this.customerService.findCustomerOrFail(customerId);

    const address = await this.prisma.$transaction(async (tx) => {
      const totalAddresses = await tx.address.count({
        where: { customerId },
      });

      if (totalAddresses >= this.MAX_ADDRESSES) {
        throw new ConflictException({
          code: 'ADDRESS_LIMIT_REACHED',
          message: `El cliente ya tiene el máximo de ${this.MAX_ADDRESSES} direcciones permitidas`,
        });
      }

      return tx.address.create({
        data: {
          ...createAddressDto,
          isDefault: totalAddresses === 0,
          customer: {
            connect: { id: customerId },
          },
        },
      });
    });

    return this.mapToResponse(address);
  }

  async setDefaultAddress(
    customerId: string,
    addressId: string,
  ): Promise<AddressResponse> {
    await this.customerService.findCustomerOrFail(customerId);

    const updated = await this.prisma.$transaction(async (tx) => {
      const address = await tx.address.findUnique({
        where: { id: addressId },
      });

      if (!address || address.customerId !== customerId) {
        throw new NotFoundException({
          code: 'ADDRESS_NOT_FOUND',
          message: 'La dirección no existe o no pertenece al cliente',
        });
      }

      await tx.address.updateMany({
        where: { customerId },
        data: { isDefault: false },
      });

      return tx.address.update({
        where: { id: addressId },
        data: { isDefault: true },
      });
    });

    return this.mapToResponse(updated);
  }

  async getAddressById(
    customerId: string,
    addressId: string,
  ): Promise<AddressResponse> {
    await this.customerService.findCustomerOrFail(customerId);

    const address = await this.findAddressOrFail(addressId, customerId);

    return this.mapToResponse(address);
  }

  async updateAddress(
    customerId: string,
    addressId: string,
    updateAddressDto: UpdateAddressDto,
  ): Promise<AddressResponse> {
    await this.customerService.findCustomerOrFail(customerId);

    const address = await this.findAddressOrFail(addressId, customerId);

    const updated = await this.prisma.address.update({
      where: { id: address.id },
      data: updateAddressDto,
    });

    return this.mapToResponse(updated);
  }

  async deleteAddress(
    customerId: string,
    addressId: string,
  ): Promise<{ message: string }> {
    await this.customerService.findCustomerOrFail(customerId);

    const address = await this.findAddressOrFail(addressId, customerId);

    await this.prisma.$transaction(async (tx) => {
      await tx.address.delete({
        where: { id: address.id },
      });

      if (address.isDefault) {
        const nextAddress = await tx.address.findFirst({
          where: { customerId },
          orderBy: { createdAt: 'asc' },
        });

        if (nextAddress) {
          await tx.address.update({
            where: { id: nextAddress.id },
            data: { isDefault: true },
          });
        }
      }
    });

    return {
      message: 'Dirección eliminada correctamente',
    };
  }

  async listAddressesByCustomer(
    customerId: string,
  ): Promise<AddressResponse[]> {
    await this.customerService.findCustomerOrFail(customerId);

    const addresses = await this.prisma.address.findMany({
      where: { customerId },
      orderBy: { createdAt: 'asc' },
    });

    return addresses.map((address) => this.mapToResponse(address));
  }
}
