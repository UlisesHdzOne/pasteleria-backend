import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCakeSizeDto } from './dto/create-cake-size.dto';
import { UpdateCakeSizeDto } from './dto/update-cake-size.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CakeSize } from '@prisma/client';
import { buildConflictError } from 'src/common/utils/build-conflict-error';
import { CakeSizeResponse } from './type/cake-size.response';

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

  // ✅ Campos que queremos retornar
  private readonly cakeSizeSelect = {
    id: true,
    name: true,
    people: true,
    description: true,
    createdAt: true,
    updatedAt: true,
  };

  // 🔍 find or fail
  public async findSizeOrFail(
    id: string,
  ): Promise<CakeSize & { createdAt: Date; updatedAt: Date }> {
    const size = await this.prisma.cakeSize.findUnique({
      where: { id },
      select: this.cakeSizeSelect,
    });

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

  // 🔹 Mapea la entidad a la respuesta
  private mapSize(
    size: CakeSize & { createdAt: Date; updatedAt: Date },
  ): CakeSizeResponse {
    return {
      id: size.id,
      name: size.name,
      people: size.people,
      description: size.description ?? '',
      createdAt: size.createdAt,
      updatedAt: size.updatedAt,
    };
  }

  // ➕ CREATE
  async createCakeSize(
    dto: CreateCakeSizeDto,
  ): Promise<{ data: CakeSizeResponse }> {
    await this.validateCreate(dto);
    const data = await this.prisma.cakeSize.create({
      data: dto,
      select: this.cakeSizeSelect,
    });
    return { data: this.mapSize(data) };
  }

  // 📋 LIST
  async findAllCakeSize(): Promise<{ data: CakeSizeResponse[] }> {
    const data = await this.prisma.cakeSize.findMany({
      orderBy: { people: 'asc' },
      select: this.cakeSizeSelect,
    });
    return { data: data.map((size) => this.mapSize(size)) }; // ✅ fix aplicado
  }

  // 🎯 GET ONE
  async findOneCakeSize(id: string): Promise<{ data: CakeSizeResponse }> {
    const data = await this.findSizeOrFail(id);
    return { data: this.mapSize(data) };
  }

  // ✏️ UPDATE
  async updateCakeSize(
    id: string,
    dto: UpdateCakeSizeDto,
  ): Promise<{ data: CakeSizeResponse }> {
    const current = await this.findSizeOrFail(id);
    await this.validateUpdate(id, dto, current);

    const data = await this.prisma.cakeSize.update({
      where: { id },
      data: dto,
      select: this.cakeSizeSelect,
    });

    return { data: this.mapSize(data) };
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
