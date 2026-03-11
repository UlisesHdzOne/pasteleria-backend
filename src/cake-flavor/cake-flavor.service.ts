import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCakeFlavorDto } from './dto/create-cake-flavor.dto';
import { UpdateCakeFlavorDto } from './dto/update-cake-flavor.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CakeFlavor } from '@prisma/client';

@Injectable()
export class CakeFlavorService {
  constructor(private readonly prisma: PrismaService) {}

  public async findFlavorOrFail(id: string): Promise<CakeFlavor> {
    const flavor = await this.prisma.cakeFlavor.findUnique({
      where: { id },
    });

    if (!flavor) {
      throw new NotFoundException({
        code: 'CAKE_FLAVOR_NOT_FOUND',
        message: `No se encontró el sabor`,
      });
    }

    return flavor;
  }

  private async validateUniqueName(name: string, ignoreId?: string) {
    const existing = await this.prisma.cakeFlavor.findFirst({
      where: { name },
      select: { id: true },
    });

    if (existing && existing.id !== ignoreId) {
      throw new ConflictException({
        code: 'CAKE_FLAVOR_ALREADY_EXISTS',
        message: `El sabor "${name}" ya existe`,
        field: 'name',
      });
    }
  }

  async createCakeFlavor(
    createCakeFlavorDto: CreateCakeFlavorDto,
  ): Promise<CakeFlavor> {
    await this.validateUniqueName(createCakeFlavorDto.name);

    return this.prisma.cakeFlavor.create({
      data: createCakeFlavorDto,
    });
  }

  async findAllCakeFlavor(): Promise<CakeFlavor[]> {
    return this.prisma.cakeFlavor.findMany({
      orderBy: { name: 'asc' },
    });
  }

  async findOneCakeFlavor(id: string): Promise<CakeFlavor> {
    return this.findFlavorOrFail(id);
  }

  async updateCakeFlavor(
    id: string,
    updateCakeFlavorDto: UpdateCakeFlavorDto,
  ): Promise<CakeFlavor> {
    const flavor = await this.findFlavorOrFail(id);

    if (updateCakeFlavorDto.name && updateCakeFlavorDto.name !== flavor.name) {
      await this.validateUniqueName(updateCakeFlavorDto.name, flavor.id);
    }

    const updated = await this.prisma.cakeFlavor.update({
      where: { id: flavor.id },
      data: updateCakeFlavorDto,
    });

    return updated;
  }

  async removeCakeFlavor(id: string): Promise<{ message: string }> {
    const flavor = await this.findFlavorOrFail(id);

    await this.prisma.cakeFlavor.delete({
      where: { id: flavor.id },
    });

    return {
      message: `Sabor eliminado correctamente`,
    };
  }
}
