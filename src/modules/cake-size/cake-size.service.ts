import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCakeSizeDto } from './dto/create-cake-size.dto';
import { UpdateCakeSizeDto } from './dto/update-cake-size.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CakeSize } from '@prisma/client';
import { buildConflictError } from 'src/common/utils/build-conflict-error';

@Injectable()
export class CakeSizeService {
  constructor(private readonly prisma: PrismaService) {}

  private readonly conflictErrors = {
    createUpdate: [
      {
        code: 'CAKE_SIZE_NAME_EXISTS',
        message: 'Ya existe un tamaño con ese nombre',
        field: 'name',
      },
      {
        code: 'CAKE_SIZE_PEOPLE_EXISTS',
        message: 'Ya existe un tamaño para esa cantidad de personas',
        field: 'people',
      },
    ],
    delete: {
      usedInOrders: {
        code: 'CAKE_SIZE_IN_USE',
        message: 'No se puede eliminar el tamaño porque está en uso en pedidos',
        field: 'id',
      },
      usedInPrices: {
        code: 'CAKE_SIZE_IN_USE',
        message:
          'No se puede eliminar el tamaño porque tiene precios asociados',
        field: 'id',
      },
    },
  };

  // 🔍 find or fail
  public async findSizeOrFail(id: string): Promise<CakeSize> {
    const size = await this.prisma.cakeSize.findUnique({ where: { id } });

    if (!size) {
      throw new NotFoundException({
        code: 'CAKE_SIZE_NOT_FOUND',
        message: 'No se encontró el tamaño',
      });
    }

    return size;
  }

  // 🔍 Validación CREATE
  private async validateCreate(dto: CreateCakeSizeDto) {
    const conflict = await this.prisma.cakeSize.findFirst({
      where: { OR: [{ name: dto.name }, { people: dto.people }] },
      select: { name: true, people: true },
    });

    if (conflict) buildConflictError(this.conflictErrors.createUpdate);
  }

  // 🔍 Validación UPDATE
  private async validateUpdate(
    id: string,
    dto: UpdateCakeSizeDto,
    current: CakeSize,
  ) {
    const newName = dto.name ?? current.name;
    const newPeople = dto.people ?? current.people;

    // Si no hay cambios, no validar
    if (newName === current.name && newPeople === current.people) return;

    const conflict = await this.prisma.cakeSize.findFirst({
      where: {
        OR: [{ name: newName }, { people: newPeople }],
        NOT: { id },
      },
      select: { name: true, people: true },
    });

    if (conflict) buildConflictError(this.conflictErrors.createUpdate);
  }

  // ➕ CREATE
  async createCakeSize(dto: CreateCakeSizeDto): Promise<{ data: CakeSize }> {
    await this.validateCreate(dto);
    const data = await this.prisma.cakeSize.create({ data: dto });
    return { data };
  }

  // 📋 LIST
  async findAllCakeSize(): Promise<{ data: CakeSize[] }> {
    const data = await this.prisma.cakeSize.findMany({
      orderBy: { people: 'asc' },
    });
    return { data };
  }

  // 🎯 GET ONE
  async findOneCakeSize(id: string): Promise<{ data: CakeSize }> {
    const data = await this.findSizeOrFail(id);
    return { data };
  }

  // ✏️ UPDATE
  async updateCakeSize(
    id: string,
    dto: UpdateCakeSizeDto,
  ): Promise<{ data: CakeSize }> {
    const current = await this.findSizeOrFail(id);
    await this.validateUpdate(id, dto, current);

    const data = await this.prisma.cakeSize.update({
      where: { id },
      data: dto,
    });

    return { data };
  }

  // ❌ DELETE
  async removeCakeSize(id: string): Promise<{ message: string }> {
    const size = await this.findSizeOrFail(id);

    const usedInOrders = await this.prisma.orderItem.findFirst({
      where: { sizeId: size.id },
      select: { id: true },
    });
    if (usedInOrders)
      buildConflictError([this.conflictErrors.delete.usedInOrders]);

    const usedInPrices = await this.prisma.cakePrice.findFirst({
      where: { sizeId: size.id },
      select: { id: true },
    });
    if (usedInPrices)
      buildConflictError([this.conflictErrors.delete.usedInPrices]);

    await this.prisma.cakeSize.delete({ where: { id: size.id } });

    return { message: 'Tamaño eliminado correctamente' };
  }
}
