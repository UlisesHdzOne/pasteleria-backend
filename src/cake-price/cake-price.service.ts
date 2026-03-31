import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';

import { CreateCakePriceDto } from './dto/create-cake-price.dto';
import { UpdateCakePriceDto } from './dto/update-cake-price.dto';

import { CakePriceResponse } from './types/cake-price.response';
import { CakeFlavorService } from 'src/modules/cake-flavor/cake-flavor.service';
import { CakeSizeService } from 'src/modules/cake-size/cake-size.service';

@Injectable()
export class CakePriceService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cakeFlavorService: CakeFlavorService,
    private readonly cakeSizeService: CakeSizeService,
  ) {}

  // SELECT reutilizable (mejor práctica)
  private readonly cakePriceSelect = {
    id: true,
    flavorId: true,
    sizeId: true,
    price: true,
    createdAt: true,
    updatedAt: true,
  };

  private mapToResponse(cakePrice: CakePriceResponse): CakePriceResponse {
    return cakePrice;
  }

  private async validateUniqueFlavorSize(
    flavorId: string,
    sizeId: string,
    ignoreId?: string,
  ) {
    const existing = await this.prisma.cakePrice.findFirst({
      where: {
        flavorId,
        sizeId,
      },
      select: { id: true },
    });

    if (existing && existing.id !== ignoreId) {
      throw new ConflictException({
        code: 'CAKE_PRICE_ALREADY_EXISTS',
        message: `Ya existe un precio para este sabor y tamaño`,
        fields: ['flavorId', 'sizeId'],
      });
    }
  }

  public async findCakePriceOrFail(id: string) {
    const cakePrice = await this.prisma.cakePrice.findUnique({
      where: { id },
      select: this.cakePriceSelect,
    });

    if (!cakePrice) {
      throw new NotFoundException({
        code: 'CAKE_PRICE_NOT_FOUND',
        message: `No se encontró el precio del pastel con id "${id}"`,
        field: 'id',
      });
    }

    return cakePrice;
  }

  async createCakePrice(
    createCakePriceDto: CreateCakePriceDto,
  ): Promise<CakePriceResponse> {
    await this.cakeFlavorService.findFlavorOrFail(createCakePriceDto.flavorId);
    await this.cakeSizeService.findSizeOrFail(createCakePriceDto.sizeId);

    const { flavorId, sizeId } = createCakePriceDto;

    await this.validateUniqueFlavorSize(flavorId, sizeId);

    const cakePrice = await this.prisma.cakePrice.create({
      data: createCakePriceDto,
      select: this.cakePriceSelect,
    });

    return this.mapToResponse(cakePrice);
  }

  async getCakePriceById(id: string): Promise<CakePriceResponse> {
    const cakePrice = await this.findCakePriceOrFail(id);
    return this.mapToResponse(cakePrice);
  }

  async updateCakePrice(
    id: string,
    updateCakePriceDto: UpdateCakePriceDto,
  ): Promise<CakePriceResponse> {
    if (updateCakePriceDto.flavorId) {
      await this.cakeFlavorService.findFlavorOrFail(
        updateCakePriceDto.flavorId,
      );
    }
    if (updateCakePriceDto.sizeId) {
      await this.cakeSizeService.findSizeOrFail(updateCakePriceDto.sizeId);
    }

    const cakePrice = await this.findCakePriceOrFail(id);

    if (updateCakePriceDto.flavorId || updateCakePriceDto.sizeId) {
      const flavorId = updateCakePriceDto.flavorId ?? cakePrice.flavorId;
      const sizeId = updateCakePriceDto.sizeId ?? cakePrice.sizeId;

      await this.validateUniqueFlavorSize(flavorId, sizeId, cakePrice.id);
    }

    const updated = await this.prisma.cakePrice.update({
      where: { id: cakePrice.id },
      data: updateCakePriceDto,
      select: this.cakePriceSelect,
    });

    return this.mapToResponse(updated);
  }

  async deleteCakePrice(id: string): Promise<{ message: string }> {
    await this.findCakePriceOrFail(id);

    await this.prisma.cakePrice.delete({
      where: { id },
    });

    return {
      message: `Precio eliminado correctamente`,
    };
  }

  async findAllCakePrices(): Promise<CakePriceResponse[]> {
    const prices = await this.prisma.cakePrice.findMany({
      orderBy: { createdAt: 'desc' },
      select: this.cakePriceSelect,
    });

    return prices.map((p) => this.mapToResponse(p));
  }

  async getPriceByFlavorAndSize(
    flavorId: string,
    sizeId: string,
  ): Promise<CakePriceResponse> {
    const cakePrice = await this.prisma.cakePrice.findFirst({
      where: {
        flavorId,
        sizeId,
      },
      select: this.cakePriceSelect,
    });

    if (!cakePrice) {
      throw new NotFoundException({
        code: 'CAKE_PRICE_NOT_FOUND',
        message: 'No existe un precio para ese sabor y tamaño',
        fields: ['flavorId', 'sizeId'],
      });
    }

    return this.mapToResponse(cakePrice);
  }
}
