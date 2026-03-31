import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, CakePrice } from '@prisma/client';

import { PrismaService } from 'src/prisma/prisma.service';

import { CreateCakePriceDto } from './dto/create-cake-price.dto';
import { UpdateCakePriceDto } from './dto/update-cake-price.dto';

import { CakePriceResponse } from './types/cake-price.response';

import { CakeFlavorService } from 'src/modules/cake-flavor/cake-flavor.service';
import { CakeSizeService } from 'src/modules/cake-size/cake-size.service';

import { buildConflictError } from 'src/common/utils/build-conflict-error';
import { ValidationError } from 'src/common/types/validation-error.type';

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

  // 🔁 Decimal → number (tipado correcto)
  private mapPrice(data: CakePrice): CakePriceResponse {
    return {
      ...data,
      price: Number(data.price),
    };
  }

  // ❗ errores reutilizables
  private getConflictErrors(): ValidationError[] {
    return [
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
    ];
  }

  // 🔍 find or fail
  public async findCakePriceOrFail(id: string): Promise<CakePrice> {
    const cakePrice = await this.prisma.cakePrice.findUnique({
      where: { id },
      select: this.cakePriceSelect,
    });

    if (!cakePrice) {
      throw new NotFoundException({
        code: 'CAKE_PRICE_NOT_FOUND',
        message: `No se encontró el precio con id "${id}"`,
        field: 'id',
      });
    }

    return cakePrice;
  }

  // ➕ CREATE
  async createCakePrice(
    dto: CreateCakePriceDto,
  ): Promise<{ data: CakePriceResponse }> {
    await this.cakeFlavorService.findFlavorOrFail(dto.flavorId);
    await this.cakeSizeService.findSizeOrFail(dto.sizeId);

    try {
      const data = await this.prisma.cakePrice.create({
        data: dto,
        select: this.cakePriceSelect,
      });

      return { data: this.mapPrice(data) };
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        buildConflictError(this.getConflictErrors());
      }

      throw error;
    }
  }

  // 🔍 GET BY ID
  async getCakePriceById(id: string): Promise<{ data: CakePriceResponse }> {
    const data = await this.findCakePriceOrFail(id);
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

    try {
      const data = await this.prisma.cakePrice.update({
        where: { id: current.id },
        data: dto,
        select: this.cakePriceSelect,
      });

      return { data: this.mapPrice(data) };
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        buildConflictError(this.getConflictErrors());
      }

      throw error;
    }
  }

  // ❌ DELETE
  async deleteCakePrice(id: string): Promise<{ message: string }> {
    await this.findCakePriceOrFail(id);

    await this.prisma.cakePrice.delete({
      where: { id },
    });

    return {
      message: 'Precio eliminado correctamente',
    };
  }

  // 📋 LIST
  async findAllCakePrices(): Promise<{ data: CakePriceResponse[] }> {
    const data = await this.prisma.cakePrice.findMany({
      orderBy: { createdAt: 'desc' },
      select: this.cakePriceSelect,
    });

    return {
      data: data.map((item) => this.mapPrice(item)),
    };
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
      throw new NotFoundException({
        code: 'CAKE_PRICE_NOT_FOUND',
        message: 'No existe un precio para ese sabor y tamaño',
        field: 'flavorId',
      });
    }

    return { data: this.mapPrice(cakePrice) };
  }
}
