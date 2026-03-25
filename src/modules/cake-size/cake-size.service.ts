import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCakeSizeDto } from './dto/create-cake-size.dto';
import { UpdateCakeSizeDto } from './dto/update-cake-size.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CakeSize } from '@prisma/client';
import { ValidationError } from 'src/common/types/validation-error.type';

@Injectable()
export class CakeSizeService {
  constructor(private readonly prisma: PrismaService) {}

  private async validateCreate(dto: CreateCakeSizeDto) {
    const existing = await this.prisma.cakeSize.findMany({
      where: {
        OR: [{ name: dto.name }, { people: dto.people }],
      },
      select: { name: true, people: true },
    });

    const errors: ValidationError[] = [];

    for (const item of existing) {
      if (item.name === dto.name) {
        errors.push({
          code: 'CAKE_SIZE_NAME_EXISTS',
          message: `Ya existe un tamaño llamado "${dto.name}"`,
          field: 'name',
        });
      }

      if (item.people === dto.people) {
        errors.push({
          code: 'CAKE_SIZE_PEOPLE_EXISTS',
          message: `Ya existe un tamaño para ${dto.people} personas`,
          field: 'people',
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
    dto: UpdateCakeSizeDto,
    current: CakeSize,
  ) {
    const conditions: { name?: string; people?: number }[] = [];

    if (dto.name !== undefined && dto.name !== current.name) {
      conditions.push({ name: dto.name });
    }

    if (dto.people !== undefined && dto.people !== current.people) {
      conditions.push({ people: dto.people });
    }

    if (conditions.length === 0) return;

    const existing = await this.prisma.cakeSize.findMany({
      where: {
        OR: conditions,
        NOT: { id },
      },
      select: { name: true, people: true },
    });

    const errors: ValidationError[] = [];

    for (const item of existing) {
      if (dto.name !== undefined && item.name === dto.name) {
        errors.push({
          code: 'CAKE_SIZE_NAME_EXISTS',
          message: `Ya existe un tamaño llamado "${dto.name}"`,
          field: 'name',
        });
      }

      if (dto.people !== undefined && item.people === dto.people) {
        errors.push({
          code: 'CAKE_SIZE_PEOPLE_EXISTS',
          message: `Ya existe un tamaño para ${dto.people} personas`,
          field: 'people',
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

  public async findSizeOrFail(id: string): Promise<CakeSize> {
    const size = await this.prisma.cakeSize.findUnique({
      where: { id },
    });

    if (!size) {
      throw new NotFoundException({
        code: 'CAKE_SIZE_NOT_FOUND',
        message: 'No se encontró el tamaño',
      });
    }

    return size;
  }

  async createCakeSize(
    createCakeSizeDto: CreateCakeSizeDto,
  ): Promise<{ data: CakeSize }> {
    await this.validateCreate(createCakeSizeDto);

    try {
      const data = await this.prisma.cakeSize.create({
        data: createCakeSizeDto,
      });

      return { data };
    } catch {
      throw new ConflictException({
        code: 'CAKE_SIZE_CONFLICT',
        message: 'Conflicto al crear el tamaño',
      });
    }
  }

  async findAllCakeSize(): Promise<{ data: CakeSize[] }> {
    const data = await this.prisma.cakeSize.findMany({
      orderBy: { people: 'asc' },
    });

    return { data };
  }

  async findOneCakeSize(id: string): Promise<{ data: CakeSize }> {
    const data = await this.findSizeOrFail(id);
    return { data };
  }

  async updateCakeSize(
    id: string,
    updateCakeSizeDto: UpdateCakeSizeDto,
  ): Promise<{ data: CakeSize }> {
    const current = await this.findSizeOrFail(id);

    await this.validateUpdate(id, updateCakeSizeDto, current);

    try {
      const data = await this.prisma.cakeSize.update({
        where: { id },
        data: updateCakeSizeDto,
      });

      return { data };
    } catch {
      throw new ConflictException({
        code: 'CAKE_SIZE_CONFLICT',
        message: 'Conflicto al actualizar el tamaño',
      });
    }
  }
  async removeCakeSize(id: string): Promise<{ message: string }> {
    const cakesize = await this.findSizeOrFail(id);

    const used = await this.prisma.orderItem.findFirst({
      where: { sizeId: cakesize.id },
      select: { id: true },
    });

    if (used) {
      throw new ConflictException({
        code: 'CAKE_SIZE_IN_USE',
        message: 'No se puede eliminar el tamaño porque está en uso en pedidos',
      });
    }

    await this.prisma.cakeSize.delete({
      where: { id: cakesize.id },
    });

    return {
      message: 'Tamaño eliminado correctamente',
    };
  }
}
