import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CustomerService } from '../customer/customer.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { Address } from '@prisma/client';
import { AddressResponse } from './type/address.response';

@Injectable()
export class AddressService {
  private readonly MAX_ADDRESSES = 3;

  constructor(
    private readonly prisma: PrismaService,
    private readonly customerService: CustomerService,
  ) {}

  private readonly addressSelect = {
    id: true,
    street: true,
    city: true,
    state: true,
    postalCode: true,
    isDefault: true,
    createdAt: true,
    customerId: true,
  };

  private readonly conflictErrors = {
    addressLimit: {
      code: 'ADDRESS_LIMIT_REACHED',
      message: `El cliente ya tiene el máximo de ${this.MAX_ADDRESSES} direcciones permitidas`,
      field: 'customerId',
    },
    notFound: {
      address: {
        code: 'ADDRESS_NOT_FOUND',
        message: 'La dirección no existe o no pertenece al cliente',
        field: 'id',
      },
    },
  };

  private mapToResponse(address: Address): AddressResponse {
    return { ...address };
  }

  private async findAddressOrFail(
    addressId: string,
    customerId: string,
  ): Promise<Address> {
    const address = await this.prisma.address.findFirst({
      where: { id: addressId, customerId },
      select: this.addressSelect,
    });

    if (!address) {
      throw new NotFoundException(this.conflictErrors.notFound.address);
    }

    return address;
  }

  // ➕ CREATE
  async createAddress(
    customerId: string,
    dto: CreateAddressDto,
  ): Promise<{ data: AddressResponse }> {
    await this.customerService.findCustomerOrFail(customerId);

    const address = await this.prisma.$transaction(async (tx) => {
      const count = await tx.address.count({ where: { customerId } });
      if (count >= this.MAX_ADDRESSES) {
        throw new ConflictException(this.conflictErrors.addressLimit);
      }

      return tx.address.create({
        data: {
          ...dto,
          isDefault: count === 0,
          customer: { connect: { id: customerId } },
        },
        select: this.addressSelect,
      });
    });

    return { data: this.mapToResponse(address) };
  }

  // ✏️ UPDATE
  async updateAddress(
    customerId: string,
    addressId: string,
    dto: UpdateAddressDto,
  ): Promise<{ data: AddressResponse }> {
    await this.customerService.findCustomerOrFail(customerId);
    const address = await this.findAddressOrFail(addressId, customerId);

    const updated = await this.prisma.address.update({
      where: { id: address.id },
      data: dto,
      select: this.addressSelect,
    });

    return { data: this.mapToResponse(updated) };
  }

  // ❌ DELETE
  async deleteAddress(
    customerId: string,
    addressId: string,
  ): Promise<{ message: string }> {
    await this.customerService.findCustomerOrFail(customerId);
    const address = await this.findAddressOrFail(addressId, customerId);

    await this.prisma.$transaction(async (tx) => {
      await tx.address.delete({ where: { id: address.id } });

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

    return { message: 'Dirección eliminada correctamente' };
  }

  // 🔹 GET SINGLE
  async getAddressById(
    customerId: string,
    addressId: string,
  ): Promise<{ data: AddressResponse }> {
    await this.customerService.findCustomerOrFail(customerId);
    const address = await this.findAddressOrFail(addressId, customerId);
    return { data: this.mapToResponse(address) };
  }

  // 📋 LIST
  async listAddressesByCustomer(
    customerId: string,
  ): Promise<{ data: AddressResponse[] }> {
    await this.customerService.findCustomerOrFail(customerId);

    const addresses = await this.prisma.address.findMany({
      where: { customerId },
      orderBy: { createdAt: 'asc' },
      select: this.addressSelect,
    });

    return { data: addresses.map((a) => this.mapToResponse(a)) };
  }

  // 🌟 SET DEFAULT
  async setDefaultAddress(
    customerId: string,
    addressId: string,
  ): Promise<{ data: AddressResponse }> {
    await this.customerService.findCustomerOrFail(customerId);

    const updated = await this.prisma.$transaction(async (tx) => {
      const address = await tx.address.findUnique({
        where: { id: addressId },
        select: this.addressSelect,
      });

      if (!address || address.customerId !== customerId) {
        throw new NotFoundException(this.conflictErrors.notFound.address);
      }

      await tx.address.updateMany({
        where: { customerId },
        data: { isDefault: false },
      });

      return tx.address.update({
        where: { id: addressId },
        data: { isDefault: true },
        select: this.addressSelect,
      });
    });

    return { data: this.mapToResponse(updated) };
  }
}
