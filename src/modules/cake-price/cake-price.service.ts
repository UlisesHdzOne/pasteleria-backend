import { Injectable, NotFoundException } from '@nestjs/common';
import { CakePrice } from '@prisma/client';

import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCakePriceDto } from './dto/create-cake-price.dto';
import { UpdateCakePriceDto } from './dto/update-cake-price.dto';
import { CakePriceResponse } from './types/cake-price.response';

import { CakeFlavorService } from 'src/modules/cake-flavor/cake-flavor.service';
import { CakeSizeService } from 'src/modules/cake-size/cake-size.service';
import { buildConflictError } from 'src/common/utils/temp-conflict-error';

@Injectable()
export class CakePriceService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cakeFlavorService: CakeFlavorService,
    private readonly cakeSizeService: CakeSizeService,
  ) {}

  private readonly cakePriceSelect = {
    id: true,
    flavorId: true,
    sizeId: true,
    price: true,
    createdAt: true,
    updatedAt: true,
  };

  // ✅ Centralización de errores
  private readonly conflictErrors = {
    createUpdate: [
      {
        code: 'CAKE_PRICE_ALREADY_EXISTS',
        message: 'Ya existe un precio para ese sabor y tamaño',
        field: 'flavorId',
      },
      {
        code: 'CAKE_PRICE_ALREADY_EXISTS',
        message: 'Ya existe un precio para ese sabor y tamaño',
        field: 'sizeId',
      },
    ],
    notFound: {
      cakePrice: {
        code: 'CAKE_PRICE_NOT_FOUND',
        message: 'No existe un precio para ese sabor y tamaño',
        field: 'flavorId',
      },
    },
  };

  private mapPrice(data: CakePrice): CakePriceResponse {
    return { ...data, price: Number(data.price) };
  }

  // 🔍 find or fail
  public async findCakePriceOrFail(id: string): Promise<CakePrice> {
    const cakePrice = await this.prisma.cakePrice.findUnique({
      where: { id },
      select: this.cakePriceSelect,
    });

    if (!cakePrice) {
      throw new NotFoundException({
        ...this.conflictErrors.notFound.cakePrice,
        message: `No se encontró el precio con id "${id}"`,
      });
    }

    return cakePrice;
  }

  // 🔍 Validación CREATE
  private async validateCreate(dto: CreateCakePriceDto) {
    const conflict = await this.prisma.cakePrice.findFirst({
      where: { flavorId: dto.flavorId, sizeId: dto.sizeId },
      select: { id: true },
    });

    if (conflict) buildConflictError(this.conflictErrors.createUpdate);
  }

  // 🔍 Validación UPDATE
  private async validateUpdate(
    id: string,
    dto: UpdateCakePriceDto,
    current: CakePrice,
  ) {
    const newFlavorId = dto.flavorId ?? current.flavorId;
    const newSizeId = dto.sizeId ?? current.sizeId;

    if (newFlavorId === current.flavorId && newSizeId === current.sizeId)
      return;

    const conflict = await this.prisma.cakePrice.findFirst({
      where: { flavorId: newFlavorId, sizeId: newSizeId, NOT: { id } },
      select: { id: true },
    });

    if (conflict) buildConflictError(this.conflictErrors.createUpdate);
  }

  // ➕ CREATE
  async createCakePrice(
    dto: CreateCakePriceDto,
  ): Promise<{ data: CakePriceResponse }> {
    await this.cakeFlavorService.findFlavorOrFail(dto.flavorId);
    await this.cakeSizeService.findSizeOrFail(dto.sizeId);
    await this.validateCreate(dto);

    const data = await this.prisma.cakePrice.create({
      data: dto,
      select: this.cakePriceSelect,
    });

    return { data: this.mapPrice(data) };
  }

  // ✏️ UPDATE
  async updateCakePrice(
    id: string,
    dto: UpdateCakePriceDto,
  ): Promise<{ data: CakePriceResponse }> {
    const current = await this.findCakePriceOrFail(id);

    if (dto.flavorId !== undefined) {
      await this.cakeFlavorService.findFlavorOrFail(dto.flavorId);
    }
    if (dto.sizeId !== undefined) {
      await this.cakeSizeService.findSizeOrFail(dto.sizeId);
    }

    await this.validateUpdate(id, dto, current);

    const data = await this.prisma.cakePrice.update({
      where: { id },
      data: dto,
      select: this.cakePriceSelect,
    });

    return { data: this.mapPrice(data) };
  }

  // ❌ DELETE
  async deleteCakePrice(id: string): Promise<{ message: string }> {
    await this.findCakePriceOrFail(id);
    await this.prisma.cakePrice.delete({ where: { id } });

    return { message: 'Precio eliminado correctamente' };
  }

  // 📋 LIST
  async findAllCakePrices(): Promise<{ data: CakePriceResponse[] }> {
    const data = await this.prisma.cakePrice.findMany({
      orderBy: { createdAt: 'desc' },
      select: this.cakePriceSelect,
    });

    return { data: data.map((price) => this.mapPrice(price)) }; // ✅ fix
  }

  // 🎯 GET BY FLAVOR + SIZE
  async getPriceByFlavorAndSize(
    flavorId: string,
    sizeId: string,
  ): Promise<{ data: CakePriceResponse }> {
    const cakePrice = await this.prisma.cakePrice.findFirst({
      where: { flavorId, sizeId },
      select: this.cakePriceSelect,
    });

    if (!cakePrice) {
      throw new NotFoundException(this.conflictErrors.notFound.cakePrice);
    }

    return { data: this.mapPrice(cakePrice) };
  }
}
