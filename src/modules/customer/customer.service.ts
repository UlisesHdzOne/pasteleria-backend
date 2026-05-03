import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { CustomerResponseDto } from './dto/customer-response.dto';
import { FindCustomerQueryDto } from './dto/find-customer-query.dto';
import { PaginatedResponse } from '@/common/interfaces/paginated-response.interface';
import { plainToInstance } from 'class-transformer';
import { CustomerMapper } from './mappers/customer.mapper';
import { CustomerQuery } from './query/customer.query';
import { PaginationQuery } from '@/common/query/pagination-query';
import { findPaginated } from '@/common/repositories/paginated.repository';
import { Prisma } from '@prisma/client';
import { softDelete } from '@/common/repositories/soft-delete.repository';

@Injectable()
export class CustomerService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateCustomerDto): Promise<CustomerResponseDto> {
    const customer = await this.prisma.customer.create({
      data: CustomerMapper.toCreate(data),
    });

    return plainToInstance(CustomerResponseDto, customer, {
      excludeExtraneousValues: true,
    });
  }

  async getById(id: string): Promise<CustomerResponseDto> {
    const customer = await this.prisma.customer.findUnique({
      where: { id },
      select: CustomerMapper.SELECT,
    });

    if (!customer) {
      throw new NotFoundException({
        message: 'Cliente no encontrado',
        code: 'CUSTOMER_NOT_FOUND',
        details: { id },
      });
    }

    if (customer.deletedAt) {
      throw new ConflictException({
        message: 'Conflicto de datos',
        code: 'CUSTOMER_ALREADY_DELETED',
        details: { id, deletedAt: customer.deletedAt },
      });
    }

    return plainToInstance(CustomerResponseDto, customer, {
      excludeExtraneousValues: true,
    });
  }

  async findAll(
    query: FindCustomerQueryDto,
  ): Promise<PaginatedResponse<CustomerResponseDto>> {
    const { page, limit } = query;

    const customerQuery = new CustomerQuery(query);
    const pagination = new PaginationQuery<Prisma.CustomerWhereInput>(
      customerQuery.where,
      page,
      limit,
    );

    return findPaginated(
      this.prisma.customer,
      pagination,
      customerQuery.orderBy,
      CustomerMapper.SELECT,
      CustomerResponseDto,
    );
  }

  async delete(id: string): Promise<{ message: string }> {
    const { updatedCount, existing } = await softDelete(
      this.prisma.customer,
      id,
    );

    if (updatedCount === 0) {
      if (!existing) {
        throw new NotFoundException({
          message: 'Cliente no encontrado',
          code: 'CUSTOMER_NOT_FOUND',
          details: { id },
        });
      }

      if (existing.deletedAt) {
        throw new ConflictException({
          message: 'Conflicto de datos',
          code: 'CUSTOMER_ALREADY_DELETED',
          details: { id, deletedAt: existing.deletedAt },
        });
      }
    }

    return {
      message: 'Cliente eliminado correctamente',
    };
  }

  async update(id: string, data: UpdateCustomerDto): Promise<CustomerResponseDto> {
    const existing = await this.prisma.customer.findUnique({
      where: { id },
      select: { id: true, deletedAt: true },
    });

    if (!existing) {
      throw new NotFoundException({
        message: 'Cliente no encontrado',
        code: 'CUSTOMER_NOT_FOUND',
        details: { id },
      });
    }

    if (existing.deletedAt) {
      throw new ConflictException({
        message: 'Conflicto de datos',
        code: 'CUSTOMER_ALREADY_DELETED',
        details: { id, deletedAt: existing.deletedAt },
      });
    }

    const customer = await this.prisma.customer.update({
      where: { id },
      data: CustomerMapper.toUpdate(data),
      select: CustomerMapper.SELECT,
    });

    return plainToInstance(CustomerResponseDto, customer, {
      excludeExtraneousValues: true,
    });
  }
}
