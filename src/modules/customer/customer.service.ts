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

  private normalizePhone(phone: string): string {
    return phone.replace(/\D/g, '');
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
    const normalizedPhone = this.normalizePhone(createCustomerDto.phone);

    await this.validateUniquePhone(normalizedPhone);

    const customer = await this.prisma.customer.create({
      data: { ...createCustomerDto, phone: normalizedPhone },
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

    if (updateCustomerDto.phone) {
      const normalizedPhone = this.normalizePhone(updateCustomerDto.phone);

      if (normalizedPhone !== customer.phone) {
        await this.validateUniquePhone(normalizedPhone, customer.id);
      }

      updateCustomerDto.phone = normalizedPhone;
    }

    const updated = await this.prisma.customer.update({
      where: { id: customer.id },
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

    // 👇 WHERE GLOBAL (sin búsqueda)
    const whereGlobal: Prisma.CustomerWhereInput = {
      deletedAt: null,
    };

    // 👇 WHERE FILTRADO
    const cleanSearch = search?.trim();

    const normalizedSearch =
      cleanSearch && /\d/.test(cleanSearch)
        ? this.normalizePhone(cleanSearch)
        : null;

    const whereFiltered: Prisma.CustomerWhereInput = {
      deletedAt: null,
      ...(cleanSearch && {
        OR: [
          { firstName: { contains: cleanSearch, mode: 'insensitive' } },
          { lastName: { contains: cleanSearch, mode: 'insensitive' } },
          ...(normalizedSearch
            ? [{ phone: { contains: normalizedSearch } }]
            : []),
        ],
      }),
    };

    const [customers, totalFiltered, totalGlobal] = await Promise.all([
      this.prisma.customer.findMany({
        where: whereFiltered,
        skip,
        take,
        orderBy: { firstName: 'asc' },
      }),
      this.prisma.customer.count({ where: whereFiltered }),
      this.prisma.customer.count({ where: whereGlobal }),
    ]);

    return {
      data: customers.map((c) => this.mapToResponse(c)),
      meta: {
        ...PaginationHelper.buildMeta(page, limit, totalFiltered),
        totalGlobal,
      },
    };
  }
}
