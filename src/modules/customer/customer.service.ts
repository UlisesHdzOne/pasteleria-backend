import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { CustomerResponseDto } from './dto/customer-response.dto';
import { CreateCustomerResponseDto } from './dto/create-customer-response.dto';
import { FindCustomerQueryDto } from './dto/find-customer-query.dto';
import { PaginatedResponse } from '@/common/interfaces/paginated-response.interface';
import { plainToInstance } from 'class-transformer';
import { CustomerMapper } from './mappers/customer.mapper';
import { CustomerQuery } from './query/customer.query';
import { PaginationQuery } from '@/common/query/pagination-query';
import { findPaginated } from '@/common/repositories/paginated.repository';
import { Prisma } from '@prisma/client';

@Injectable()
export class CustomerService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateCustomerDto): Promise<CreateCustomerResponseDto> {
    const customer = await this.prisma.customer.create({
      data: CustomerMapper.toCreate(data),
    });

    return plainToInstance(CreateCustomerResponseDto, customer, {
      excludeExtraneousValues: true,
    });
  }

  async findAll(
    query: FindCustomerQueryDto,
  ): Promise<PaginatedResponse<CustomerResponseDto>> {
    const { page, limit } = query;

    const customerQuery = new CustomerQuery(query);
    const pagination = new PaginationQuery<Prisma.CustomerWhereInput>(customerQuery.where, page, limit);

    return findPaginated(
      this.prisma.customer,
      pagination,
      customerQuery.orderBy,
      CustomerMapper.SELECT,
      CustomerResponseDto,
    );
  }
}