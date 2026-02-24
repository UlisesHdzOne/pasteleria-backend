import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CustomerResponse } from './types/customer.response';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer, Prisma } from '@prisma/client';
import { PaginationHelper } from 'src/common/helpers/pagination.helper';
import { PaginatedResponse } from 'src/common/types/pagination.types';

@Injectable()
export class CustomerService {
  constructor(private readonly prisma: PrismaService) {}

  private mapToResponse(customer: Customer): CustomerResponse {
    return {
      id: customer.id,
      firstName: customer.firstName,
      lastName: customer.lastName,
      phone: customer.phone,
      createdAt: customer.createdAt,
      updatedAt: customer.updatedAt,
    };
  }

  private async validateUniquePhone(phone: string, ignoreId?: string) {
    const existing = await this.prisma.customer.findUnique({
      where: { phone },
      select: { id: true },
    });

    // Solo lanzar conflicto si existe otro cliente distinto
    if (existing && existing.id !== ignoreId) {
      throw new ConflictException({
        code: 'PHONE_ALREADY_EXISTS',
        message: `El teléfono "${phone}" ya está registrado`,
        field: 'phone',
      });
    }
  }

  async findCustomerOrFail(id: string) {
    const customer = await this.prisma.customer.findFirst({
      where: { id, deletedAt: null },
    });

    if (!customer) {
      throw new NotFoundException({
        code: 'CUSTOMER_NOT_FOUND',
        message: `No se encontró el cliente con id "${id}"`,
        field: 'id',
      });
    }

    return customer;
  }

  async createCustomer(
    createCustomerDto: CreateCustomerDto,
  ): Promise<CustomerResponse> {
    await this.validateUniquePhone(createCustomerDto.phone);

    const customer = await this.prisma.customer.create({
      data: createCustomerDto,
    });
    return this.mapToResponse(customer);
  }

  async getCustomerById(id: string): Promise<CustomerResponse> {
    const customer = await this.findCustomerOrFail(id);

    return this.mapToResponse(customer);
  }

  async updateCustomer(
    id: string,
    updateCustomerDto: UpdateCustomerDto,
  ): Promise<CustomerResponse> {
    const customer = await this.findCustomerOrFail(id);

    // Validar phone si se está actualizando y no es el mismo que ya tiene este cliente
    if (updateCustomerDto.phone && updateCustomerDto.phone !== customer.phone) {
      await this.validateUniquePhone(updateCustomerDto.phone, customer.id);
    }

    const updated = await this.prisma.customer.update({
      where: { id },
      data: updateCustomerDto,
    });

    return this.mapToResponse(updated);
  }

  async deleteCustomer(id: string): Promise<{ message: string }> {
    const customer = await this.findCustomerOrFail(id);

    await this.prisma.customer.update({
      where: { id: customer.id },
      data: { deletedAt: new Date() },
    });

    return {
      message: `Cliente con id "${id}" eliminado correctamente (lógicamente)`,
    };
  }

  async findAllCustomers(
    page: number = PaginationHelper.DEFAULT_PAGE,
    limit: number = PaginationHelper.DEFAULT_LIMIT,
    search?: string,
  ): Promise<PaginatedResponse<CustomerResponse>> {
    const { skip, take } = PaginationHelper.validate(page, limit);
    const where: Prisma.CustomerWhereInput = {
      deletedAt: null, // <- no traer eliminados
    };

    if (search) {
      where.OR = [
        { firstName: { contains: search, mode: 'insensitive' } },
        { lastName: { contains: search, mode: 'insensitive' } },
        { phone: { contains: search, mode: 'insensitive' } },
      ];
    }
    if (search) {
      where.firstName = { contains: search, mode: 'insensitive' };
    }

    const [Customers, total] = await Promise.all([
      this.prisma.customer.findMany({
        where,
        skip,
        take,
        select: {
          id: true,
          firstName: true,
          lastName: true,
          phone: true,
          createdAt: true,
          updatedAt: true,
        },
        orderBy: { firstName: 'asc' },
      }),
      this.prisma.customer.count({ where }),
    ]);

    return {
      data: Customers.map((customer) => ({
        id: customer.id,
        firstName: customer.firstName,
        lastName: customer.lastName,
        phone: customer.phone,
        createdAt: customer.createdAt,
        updatedAt: customer.updatedAt,
      })),
      meta: PaginationHelper.buildMeta(page, limit, total),
    };

    // const customers = await this.prisma.customer.findMany({
    //   where: { deletedAt: null },
    //   orderBy: { createdAt: 'desc' },
    // });

    // return customers.map((customer) => this.mapToResponse(customer));
  }
}
