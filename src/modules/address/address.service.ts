import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { AddressResponseDto } from './dto/address-response.dto';
import { plainToInstance } from 'class-transformer';
import { AddressMapper } from './mappers/address.mapper';
import { Prisma } from '@prisma/client';

@Injectable()
export class AddressService {
  constructor(private readonly prisma: PrismaService) {}

  async create(customerId: string, data: CreateAddressDto): Promise<AddressResponseDto> {
    // Si se marca como default, quitar default de otras direcciones del cliente
    if (data.isDefault) {
      await this.prisma.address.updateMany({
        where: { customerId, isDefault: true },
        data: { isDefault: false },
      });
    }

    const address = await this.prisma.address.create({
      data: AddressMapper.toCreate(customerId, data),
      select: AddressMapper.SELECT,
    });

    return plainToInstance(AddressResponseDto, address, {
      excludeExtraneousValues: true,
    });
  }

  async findAll(customerId: string): Promise<AddressResponseDto[]> {
    const addresses = await this.prisma.address.findMany({
      where: { customerId },
      select: AddressMapper.SELECT,
      orderBy: { isDefault: 'desc' }, // Default primero
    });

    return plainToInstance(AddressResponseDto, addresses, {
      excludeExtraneousValues: true,
    });
  }

  async findOne(id: string): Promise<AddressResponseDto> {
    const address = await this.prisma.address.findUnique({
      where: { id },
      select: AddressMapper.SELECT,
    });

    if (!address) {
      throw new NotFoundException({
        message: 'Dirección no encontrada',
        code: 'ADDRESS_NOT_FOUND',
        details: { id },
      });
    }

    return plainToInstance(AddressResponseDto, address, {
      excludeExtraneousValues: true,
    });
  }

  async update(id: string, data: UpdateAddressDto): Promise<AddressResponseDto> {
    const existing = await this.prisma.address.findUnique({
      where: { id },
      select: { id: true, customerId: true, isDefault: true },
    });

    if (!existing) {
      throw new NotFoundException({
        message: 'Dirección no encontrada',
        code: 'ADDRESS_NOT_FOUND',
        details: { id },
      });
    }

    // Si se marca como default, quitar default de otras direcciones del mismo cliente
    if (data.isDefault && !existing.isDefault) {
      await this.prisma.address.updateMany({
        where: { 
          customerId: existing.customerId, 
          id: { not: id },
          isDefault: true 
        },
        data: { isDefault: false },
      });
    }

    const address = await this.prisma.address.update({
      where: { id },
      data: AddressMapper.toUpdate(data),
      select: AddressMapper.SELECT,
    });

    return plainToInstance(AddressResponseDto, address, {
      excludeExtraneousValues: true,
    });
  }

  async delete(id: string): Promise<{ message: string }> {
    const existing = await this.prisma.address.findUnique({
      where: { id },
      select: { id: true },
    });

    if (!existing) {
      throw new NotFoundException({
        message: 'Dirección no encontrada',
        code: 'ADDRESS_NOT_FOUND',
        details: { id },
      });
    }

    await this.prisma.address.delete({
      where: { id },
    });

    return {
      message: 'Dirección eliminada correctamente',
    };
  }

  async setDefault(customerId: string, addressId: string): Promise<AddressResponseDto> {
    // Verificar que la dirección pertenezca al cliente
    const address = await this.prisma.address.findFirst({
      where: { id: addressId, customerId },
      select: { id: true, isDefault: true },
    });

    if (!address) {
      throw new NotFoundException({
        message: 'Dirección no encontrada o no pertenece al cliente',
        code: 'ADDRESS_NOT_FOUND',
        details: { addressId, customerId },
      });
    }

    // Si ya es default, no hacer nada
    if (address.isDefault) {
      return this.findOne(addressId);
    }

    // Quitar default de todas las direcciones del cliente
    await this.prisma.address.updateMany({
      where: { customerId },
      data: { isDefault: false },
    });

    // Establecer nueva dirección como default
    const updatedAddress = await this.prisma.address.update({
      where: { id: addressId },
      data: { isDefault: true },
      select: AddressMapper.SELECT,
    });

    return plainToInstance(AddressResponseDto, updatedAddress, {
      excludeExtraneousValues: true,
    });
  }
}
