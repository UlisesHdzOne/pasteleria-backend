import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateExtraDto } from './dto/create-extra.dto';
import { UpdateExtraDto } from './dto/update-extra.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Extra } from '@prisma/client';

@Injectable()
export class ExtraService {
  constructor(private readonly prisma: PrismaService) {}

  private async findExtraOrFail(id: string): Promise<Extra> {
    const extra = await this.prisma.extra.findUnique({
      where: { id },
    });

    if (!extra) {
      throw new NotFoundException({
        code: 'EXTRA_NOT_FOUND',
        message: 'No se encontró el extra',
      });
    }

    return extra;
  }

  private async validateUniqueName(
    name: string,
    ignoreId?: string,
  ): Promise<void> {
    const existing = await this.prisma.extra.findFirst({
      where: { name },
      select: { id: true },
    });

    if (existing && existing.id !== ignoreId) {
      throw new ConflictException({
        code: 'EXTRA_ALREADY_EXISTS',
        message: `Ya existe un extra con el nombre "${name}"`,
        field: 'name',
      });
    }
  }

  async createExtra(createExtraDto: CreateExtraDto): Promise<Extra> {
    await this.validateUniqueName(createExtraDto.name);

    const extra = await this.prisma.extra.create({
      data: createExtraDto,
    });

    return extra;
  }

  async findAllExtra(): Promise<Extra[]> {
    return this.prisma.extra.findMany({
      orderBy: { name: 'asc' },
    });
  }

  async findOneExtra(id: string): Promise<Extra> {
    return this.findExtraOrFail(id);
  }

  async updateExtra(
    id: string,
    updateExtraDto: UpdateExtraDto,
  ): Promise<Extra> {
    const extra = await this.findExtraOrFail(id);

    if (updateExtraDto.name && updateExtraDto.name !== extra.name) {
      await this.validateUniqueName(updateExtraDto.name, extra.id);
    }

    const updated = await this.prisma.extra.update({
      where: { id: extra.id },
      data: updateExtraDto,
    });

    return updated;
  }

  async removeExtra(id: string): Promise<{ message: string }> {
    const extra = await this.findExtraOrFail(id);

    await this.prisma.extra.delete({
      where: { id: extra.id },
    });

    return {
      message: 'Extra eliminado correctamente',
    };
  }
}
