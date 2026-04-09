import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCakeFlavorDto } from './dto/create-cake-flavor.dto';
import { UpdateCakeFlavorDto } from './dto/update-cake-flavor.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CakeFlavor } from '@prisma/client';
import { buildConflictError } from 'src/common/utils/temp-conflict-error';

@Injectable()
export class CakeFlavorService {
  constructor(private readonly prisma: PrismaService) {}

  private readonly conflictErrors = {
    createUpdate: [
      {
        code: 'CAKE_FLAVOR_NAME_EXISTS',
        message: 'Ya existe un sabor con ese nombre',
        field: 'name',
      },
    ],
    delete: {
      usedInOrders: {
        code: 'CAKE_FLAVOR_IN_USE',
        message: 'No se puede eliminar el sabor porque está en uso en pedidos',
        field: 'id',
      },
      usedInPrices: {
        code: 'CAKE_FLAVOR_IN_USE',
        message: 'No se puede eliminar el sabor porque tiene precios asociados',
        field: 'id',
      },
    },
  };

  // 🔍 find or fail
  public async findFlavorOrFail(id: string): Promise<CakeFlavor> {
    const flavor = await this.prisma.cakeFlavor.findUnique({ where: { id } });
    if (!flavor) {
      throw new NotFoundException({
        code: 'CAKE_FLAVOR_NOT_FOUND',
        message: 'No se encontró el sabor',
      });
    }
    return flavor;
  }

  // 🔍 Validación CREATE
  private async validateCreate(dto: CreateCakeFlavorDto) {
    const existing = await this.prisma.cakeFlavor.findFirst({
      where: { name: dto.name },
      select: { id: true },
    });

    if (existing) buildConflictError(this.conflictErrors.createUpdate);
  }

  // 🔍 Validación UPDATE
  private async validateUpdate(
    id: string,
    dto: UpdateCakeFlavorDto,
    current: CakeFlavor,
  ) {
    if (dto.name && dto.name !== current.name) {
      const existing = await this.prisma.cakeFlavor.findFirst({
        where: { name: dto.name, NOT: { id } },
        select: { id: true },
      });

      if (existing) buildConflictError(this.conflictErrors.createUpdate);
    }
  }

  // ➕ CREATE
  async createCakeFlavor(
    dto: CreateCakeFlavorDto,
  ): Promise<{ data: CakeFlavor }> {
    await this.validateCreate(dto);
    const data = await this.prisma.cakeFlavor.create({ data: dto });
    return { data };
  }

  // 📋 LIST
  async findAllCakeFlavor(): Promise<{ data: CakeFlavor[] }> {
    const data = await this.prisma.cakeFlavor.findMany({
      orderBy: { name: 'asc' },
    });
    return { data };
  }

  // 🎯 GET ONE
  async findOneCakeFlavor(id: string): Promise<{ data: CakeFlavor }> {
    const data = await this.findFlavorOrFail(id);
    return { data };
  }

  // ✏️ UPDATE
  async updateCakeFlavor(
    id: string,
    dto: UpdateCakeFlavorDto,
  ): Promise<{ data: CakeFlavor }> {
    const current = await this.findFlavorOrFail(id);
    await this.validateUpdate(id, dto, current);

    const data = await this.prisma.cakeFlavor.update({
      where: { id },
      data: dto,
    });

    return { data };
  }

  // ❌ DELETE
  async removeCakeFlavor(id: string): Promise<{ message: string }> {
    const flavor = await this.findFlavorOrFail(id);

    // 🔒 Restrict: verificar si está en uso en pedidos
    const usedInOrders = await this.prisma.orderItem.findFirst({
      where: { flavorId: flavor.id },
      select: { id: true },
    });
    if (usedInOrders)
      buildConflictError([this.conflictErrors.delete.usedInOrders]);

    // 🔒 Restrict: verificar si tiene precios asociados
    const usedInPrices = await this.prisma.cakePrice.findFirst({
      where: { flavorId: flavor.id },
      select: { id: true },
    });
    if (usedInPrices)
      buildConflictError([this.conflictErrors.delete.usedInPrices]);

    await this.prisma.cakeFlavor.delete({ where: { id: flavor.id } });

    return { message: 'Sabor eliminado correctamente' };
  }
}
