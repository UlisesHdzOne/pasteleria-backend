import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { CustomerResponse } from './types/customer.response';
import { Customer, Prisma } from '@prisma/client';
import { PaginationHelper } from 'src/common/helpers/pagination.helper';

@Injectable()
export class CustomerService {
  constructor(private readonly prisma: PrismaService) {}

  // ✅ Campos que queremos retornar
  private readonly customerSelect = {
    id: true,
    firstName: true,
    lastName: true,
    phone: true,
    createdAt: true,
    updatedAt: true,
    deletedAt: true,
  };

  // ✅ Centralización de errores
  private readonly conflictErrors = {
    phoneAlreadyExists: {
      code: 'PHONE_ALREADY_EXISTS',
      message: 'El teléfono ya está registrado',
      field: 'phone',
    },
    notFound: {
      customer: {
        code: 'CUSTOMER_NOT_FOUND',
        message: 'No se encontró el cliente',
        field: 'id',
      },
    },
  };

  // 🔹 Mapea la entidad a la respuesta
  private mapCustomer(customer: Customer): CustomerResponse {
    return { ...customer };
  }

  // 🔹 Normaliza teléfono
  private normalizePhone(phone: string): string {
    return phone.replace(/\D/g, '');
  }

  // 🔍 find or fail
  public async findCustomerOrFail(id: string): Promise<Customer> {
    const customer = await this.prisma.customer.findFirst({
      where: { id, deletedAt: null },
      select: this.customerSelect,
    });

    if (!customer) {
      throw new NotFoundException({
        ...this.conflictErrors.notFound.customer,
        message: `No se encontró el cliente con id "${id}"`,
      });
    }

    return customer;
  }

  // 🔍 Validación CREATE/UPDATE
  private async validateUniquePhone(phone: string, ignoreId?: string) {
    const conflict = await this.prisma.customer.findFirst({
      where: ignoreId ? { phone, NOT: { id: ignoreId } } : { phone },
      select: { id: true },
    });

    if (conflict) {
      throw new ConflictException({
        code: 'VALIDATION_ERRORS',
        message: 'Errores de validación',
        errors: [this.conflictErrors.phoneAlreadyExists],
      });
    }
  }

  // ➕ CREATE
  async createCustomer(
    dto: CreateCustomerDto,
  ): Promise<{ data: CustomerResponse }> {
    const normalizedPhone = this.normalizePhone(dto.phone);
    await this.validateUniquePhone(normalizedPhone);

    const customer = await this.prisma.customer.create({
      data: { ...dto, phone: normalizedPhone },
      select: this.customerSelect,
    });

    return { data: this.mapCustomer(customer) };
  }

  // ✏️ UPDATE
  async updateCustomer(
    id: string,
    dto: UpdateCustomerDto,
  ): Promise<{ data: CustomerResponse }> {
    const customer = await this.findCustomerOrFail(id);

    if (dto.phone) {
      const normalizedPhone = this.normalizePhone(dto.phone);
      if (normalizedPhone !== customer.phone) {
        await this.validateUniquePhone(normalizedPhone, customer.id);
      }
      dto.phone = normalizedPhone;
    }

    const updated = await this.prisma.customer.update({
      where: { id: customer.id },
      data: dto,
      select: this.customerSelect,
    });

    return { data: this.mapCustomer(updated) };
  }

  // 🔹 GET BY ID (para el controlador)
  async getCustomerById(id: string): Promise<{ data: CustomerResponse }> {
    const customer = await this.findCustomerOrFail(id);
    return { data: this.mapCustomer(customer) };
  }

  // ❌ DELETE (soft)
  async deleteCustomer(id: string): Promise<{ message: string }> {
    await this.findCustomerOrFail(id);

    await this.prisma.customer.update({
      where: { id },
      data: { deletedAt: new Date() },
    });

    return {
      message: `Cliente con id "${id}" eliminado correctamente (lógicamente)`,
    };
  }

  // 📋 LIST con paginación y búsqueda
  async findAllCustomers(
    page: number = PaginationHelper.DEFAULT_PAGE,
    limit: number = PaginationHelper.DEFAULT_LIMIT,
    search?: string,
  ): Promise<{ data: CustomerResponse[]; meta: any }> {
    const { skip, take } = PaginationHelper.validate(page, limit);

    const cleanSearch = search?.trim();
    const normalizedSearch =
      cleanSearch && /\d/.test(cleanSearch)
        ? this.normalizePhone(cleanSearch)
        : null;

    const whereFiltered: Prisma.CustomerWhereInput = {
      deletedAt: null,
      ...(cleanSearch && {
        OR: [
          {
            firstName: {
              contains: cleanSearch,
              mode: 'insensitive' as const,
            },
          },
          {
            lastName: {
              contains: cleanSearch,
              mode: 'insensitive' as const,
            },
          },
          ...(normalizedSearch
            ? [{ phone: { contains: normalizedSearch } }]
            : []),
        ],
      }),
    };

    const [customers, totalFiltered] = await Promise.all([
      this.prisma.customer.findMany({
        where: whereFiltered,
        skip,
        take,
        orderBy: { firstName: 'asc' },
        select: this.customerSelect,
      }),
      this.prisma.customer.count({ where: whereFiltered }),
    ]);

    return {
      data: customers.map((c) => this.mapCustomer(c)),
      meta: PaginationHelper.buildMeta(page, limit, totalFiltered),
    };
  }
}
