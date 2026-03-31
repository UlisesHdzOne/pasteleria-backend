import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCakeFlavorDto } from './dto/create-cake-flavor.dto';
import { UpdateCakeFlavorDto } from './dto/update-cake-flavor.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CakeFlavor } from '@prisma/client';
import { ValidationError } from 'src/common/types/validation-error.type';

@Injectable()
export class CakeFlavorService {
  constructor(private readonly prisma: PrismaService) {}

  private async validateCreate(dto: CreateCakeFlavorDto) {
    const existing = await this.prisma.cakeFlavor.findMany({
      where: { name: dto.name },
      select: { name: true },
    });

    const errors: ValidationError[] = [];

    for (const item of existing) {
      if (item.name === dto.name) {
        errors.push({
          code: 'CAKE_FLAVOR_NAME_EXISTS',
          message: `Ya existe un sabor llamado "${dto.name}"`,
          field: 'name',
        });
      }
    }

    if (errors.length > 0) {
      throw new ConflictException({
        code: 'VALIDATION_ERRORS',
        message: 'Errores de validación',
        errors,
      });
    }
  }

  private async validateUpdate(
    id: string,
    dto: UpdateCakeFlavorDto,
    current: CakeFlavor,
  ) {
    const errors: ValidationError[] = [];

    if (dto.name && dto.name !== current.name) {
      const existing = await this.prisma.cakeFlavor.findMany({
        where: { name: dto.name, NOT: { id } },
        select: { name: true },
      });

      for (const item of existing) {
        if (item.name === dto.name) {
          errors.push({
            code: 'CAKE_FLAVOR_NAME_EXISTS',
            message: `Ya existe un sabor llamado "${dto.name}"`,
            field: 'name',
          });
        }
      }
    }

    if (errors.length > 0) {
      throw new ConflictException({
        code: 'VALIDATION_ERRORS',
        message: 'Errores de validación',
        errors,
      });
    }
  }

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

  async createCakeFlavor(
    createCakeFlavorDto: CreateCakeFlavorDto,
  ): Promise<{ data: CakeFlavor }> {
    await this.validateCreate(createCakeFlavorDto);

    try {
      const data = await this.prisma.cakeFlavor.create({
        data: createCakeFlavorDto,
      });
      return { data };
    } catch {
      throw new ConflictException({
        code: 'CAKE_FLAVOR_CONFLICT',
        message: 'Conflicto al crear el sabor',
      });
    }
  }

  async findAllCakeFlavor(): Promise<{ data: CakeFlavor[] }> {
    const data = await this.prisma.cakeFlavor.findMany({
      orderBy: { name: 'asc' },
    });
    return { data };
  }

  async findOneCakeFlavor(id: string): Promise<{ data: CakeFlavor }> {
    const data = await this.findFlavorOrFail(id);
    return { data };
  }

  async updateCakeFlavor(
    id: string,
    updateCakeFlavorDto: UpdateCakeFlavorDto,
  ): Promise<{ data: CakeFlavor }> {
    const current = await this.findFlavorOrFail(id);
    await this.validateUpdate(id, updateCakeFlavorDto, current);

    try {
      const data = await this.prisma.cakeFlavor.update({
        where: { id },
        data: updateCakeFlavorDto,
      });
      return { data };
    } catch {
      throw new ConflictException({
        code: 'CAKE_FLAVOR_CONFLICT',
        message: 'Conflicto al actualizar el sabor',
      });
    }
  }

  async removeCakeFlavor(id: string): Promise<{ message: string }> {
    const flavor = await this.findFlavorOrFail(id);

    const used = await this.prisma.orderItem.findFirst({
      where: { flavorId: flavor.id },
      select: { id: true },
    });

    if (used) {
      throw new ConflictException({
        code: 'CAKE_FLAVOR_IN_USE',
        message: 'No se puede eliminar el sabor porque está en uso en pedidos',
      });
    }

    await this.prisma.cakeFlavor.delete({ where: { id: flavor.id } });
    return { message: 'Sabor eliminado correctamente' };
  }
}
