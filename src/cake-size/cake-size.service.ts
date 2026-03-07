import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCakeSizeDto } from './dto/create-cake-size.dto';
import { UpdateCakeSizeDto } from './dto/update-cake-size.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CakeSize } from '@prisma/client';

@Injectable()
export class CakeSizeService {
  constructor(private readonly prisma: PrismaService) {}

  private async findSizeOrFail(id: string): Promise<CakeSize> {
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

  private async validateUniquePeople(people: number, ignoreId?: string) {
    const existing = await this.prisma.cakeSize.findFirst({
      where: { people },
      select: { id: true },
    });

    if (existing && existing.id !== ignoreId) {
      throw new ConflictException({
        code: 'CAKE_SIZE_ALREADY_EXISTS',
        message: `Ya existe un tamaño para ${people} personas`,
        field: 'people',
      });
    }
  }

  async createCakeSize(
    createCakeSizeDto: CreateCakeSizeDto,
  ): Promise<CakeSize> {
    await this.validateUniquePeople(createCakeSizeDto.people);

    return this.prisma.cakeSize.create({
      data: createCakeSizeDto,
    });
  }

  async findAllCakeSize(): Promise<CakeSize[]> {
    return this.prisma.cakeSize.findMany({
      orderBy: { people: 'asc' },
    });
  }

  async findOneCakeSize(id: string): Promise<CakeSize> {
    return this.findSizeOrFail(id);
  }

  async updateCakeSize(
    id: string,
    updateCakeSizeDto: UpdateCakeSizeDto,
  ): Promise<CakeSize> {
    const size = await this.findSizeOrFail(id);

    if (updateCakeSizeDto.people && updateCakeSizeDto.people !== size.people) {
      await this.validateUniquePeople(updateCakeSizeDto.people, size.id);
    }

    const updated = await this.prisma.cakeSize.update({
      where: { id: size.id },
      data: updateCakeSizeDto,
    });

    return updated;
  }

  async removeCakeSize(id: string): Promise<{ message: string }> {
    const size = await this.findSizeOrFail(id);

    await this.prisma.cakeSize.delete({
      where: { id: size.id },
    });

    return {
      message: 'Tamaño eliminado correctamente',
    };
  }
}
