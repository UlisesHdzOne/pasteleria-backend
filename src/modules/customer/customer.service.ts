// customer.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { CustomerResponseDto } from './dto/customer-response.dto';
import { plainToInstance } from 'class-transformer';
import { CreateCustomerResponseDto } from './dto/create-customer-response.dto';
import { PaginationHelper } from '@/common/helpers/pagination.helper';
import { PaginatedResponse } from '@/common/interfaces/paginated-response.interface';

@Injectable()
export class CustomerService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateCustomerDto): Promise<CreateCustomerResponseDto> {
    const customer = await this.prisma.customer.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        email: data.email || null,
        avatar: data.avatar || null,
      },
    });

    // ✅ Transformar el objeto de Prisma a tu DTO de respuesta
    return plainToInstance(CreateCustomerResponseDto, customer, {
      excludeExtraneousValues: true,
    });
  }

  async findAll(
    pageParam: number = PaginationHelper.DEFAULT_PAGE,
    limitParam: number = PaginationHelper.DEFAULT_LIMIT,
  ): Promise<PaginatedResponse<CustomerResponseDto>> {
    const { page, limit, skip, take } = PaginationHelper.validate(
      pageParam,
      limitParam,
    );

    const [customers, total] = await Promise.all([
      this.prisma.customer.findMany({
        where: { deletedAt: null },
        orderBy: { createdAt: 'desc' },
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
      this.prisma.customer.count({
        where: { deletedAt: null },
      }),
    ]);

    return {
      data: plainToInstance(CustomerResponseDto, customers, {
        excludeExtraneousValues: true,
      }),
      meta: PaginationHelper.buildMeta(page, limit, total),
    };
  }
}
