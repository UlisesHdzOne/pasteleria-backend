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

  private async findFlavorOrFail(id: string): Promise<CakeFlavor> {
    const flavor = await this.prisma.cakeFlavor.findUnique({
      where: { id },
    });

    if (!flavor) {
      throw new NotFoundException({
        code: 'CAKE_FLAVOR_NOT_FOUND',
        message: `No se encontró el sabor con id "${id}"`,
        field: 'id',
      });
    }

    return flavor;
  }

  private async validateNameExists(name: string, ignoreId?: string) {
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

  async createCakeFlavor(createCakeFlavorDto: CreateCakeFlavorDto) {
    await this.validateNameExists(createCakeFlavorDto.name);

    return await this.prisma.cakeFlavor.create({
      data: createCakeFlavorDto,
    });
  }

  async findAllCakeFlavor(): Promise<CakeFlavor[]> {
    return await this.prisma.cakeFlavor.findMany({
      orderBy: { name: 'asc' },
    });
  }

  async findOneCakeFlavor(id: string): Promise<CakeFlavor> {
    return await this.findFlavorOrFail(id);
  }

  async updateCakeFlavor(id: string, updateCakeFlavorDto: UpdateCakeFlavorDto) {
    const flavor = await this.findFlavorOrFail(id);

    if (
      updateCakeFlavorDto.name &&
      updateCakeFlavorDto.name !== flavor.name
    ) {
      await this.validateNameExists(updateCakeFlavorDto.name, flavor.id);
    }

    return await this.prisma.cakeFlavor.update({
      where: { id },
      data: updateCakeFlavorDto,
    });
  }

  async removeCakeFlavor(id: string) {
    await this.findFlavorOrFail(id);

    await this.prisma.cakeFlavor.delete({
      where: { id },
    });

    return {
      message: `Sabor con id "${id}" eliminado correctamente`,
    };
  }
}