// customer.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { CustomerResponseDto } from './dto/customer-response.dto';
import { plainToInstance } from 'class-transformer';
import { CreateCustomerResponseDto } from './dto/create-customer-response.dto';
import { PaginationHelper } from '@/common/helpers/pagination.helper';
import { PaginatedResponse } from '@/common/interfaces/paginated-response.interface';
import { Prisma } from '@prisma/client';
import { FindCustomerQueryDto } from './dto/find-customer-query.dto';

@Injectable()
export class CustomerService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateCustomerDto): Promise<CreateCustomerResponseDto> {
    const customer = await this.prisma.customer.create({
      data: {
        firstName: data.firstName.trim(),
        lastName: data.lastName.trim(),
        phone: data.phone.replace(/\D/g, ''),
        email: data.email || null,
        avatar: data.avatar || null,
      },
    });

    return plainToInstance(CreateCustomerResponseDto, customer, {
      excludeExtraneousValues: true,
    });
  }

  async findAll(
    query: FindCustomerQueryDto,
  ): Promise<PaginatedResponse<CustomerResponseDto>> {
    const {
      page = 1,
      limit = 10,
      search,
      status = 'active',
      sortBy = 'createdAt',
      sortOrder = 'desc',
      createdFrom,
      createdTo,
    } = query;

    const { skip, take } = PaginationHelper.validate(page, limit);

    const cleanSearch = search?.trim().replace(/\s+/g, ' ') || undefined;
    const cleanPhoneSearch = cleanSearch?.replace(/\D/g, '');

    // 👉 sort seguro
    const allowedSort = ['firstName', 'lastName', 'createdAt'];
    const safeSortBy = allowedSort.includes(sortBy) ? sortBy : 'createdAt';

    const where: Prisma.CustomerWhereInput = {
      // 👉 status (soft delete)
      ...(status === 'deleted'
        ? { deletedAt: { not: null } }
        : status === 'all'
          ? {}
          : { deletedAt: null }),

      // 👉 search
      ...(cleanSearch && {
        OR: [
          {
            firstName: {
              contains: cleanSearch,
              mode: Prisma.QueryMode.insensitive,
            },
          },
          {
            lastName: {
              contains: cleanSearch,
              mode: Prisma.QueryMode.insensitive,
            },
          },
          ...(cleanPhoneSearch
            ? [
                {
                  phone: {
                    contains: cleanPhoneSearch,
                  },
                },
              ]
            : []),
        ],
      }),

      // 👉 rango de fechas
      ...((createdFrom || createdTo) && {
        createdAt: {
          ...(createdFrom && { gte: new Date(createdFrom) }),
          ...(createdTo && { lte: new Date(createdTo) }),
        },
      }),
    };

    const [customers, total, totalAll] = await Promise.all([
      this.prisma.customer.findMany({
        where,
        orderBy: {
          [safeSortBy]: sortOrder,
        },
        skip,
        take,
        select: {
          id: true,
          firstName: true,
          lastName: true,
          phone: true,
          email: true,
          createdAt: true,
          updatedAt: true,
        },
      }),
      this.prisma.customer.count({ where }),
      this.prisma.customer.count({
        where: { deletedAt: null }, // 👉 global activos
      }),
    ]);

    return {
      data: plainToInstance(CustomerResponseDto, customers, {
        excludeExtraneousValues: true,
      }),
      meta: {
        ...PaginationHelper.buildMeta(page, limit, total),
        totalAll, // 👈 nuevo
      },
    };
  }
}
