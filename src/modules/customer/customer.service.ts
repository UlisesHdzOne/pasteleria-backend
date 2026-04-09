import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { PaginationHelper } from 'src/common/helpers/pagination.helper';
import { SearchHelper } from 'src/common/helpers/search.helper';
import { ErrorCode } from 'src/common/enums/error-code.enum';
import { BusinessErrorHelper } from 'src/common/utils/business-error.helper';
import {
  CUSTOMER_SELECT,
  CustomerPayload,
  Prisma,
} from './types/customer.types';

@Injectable()
export class CustomerService {
  constructor(private readonly prisma: PrismaService) {}

  private readonly customerSelect = CUSTOMER_SELECT;

  private normalizePhone(phone: string): string {
    return phone.replace(/\D/g, '');
  }

  public async findCustomerOrFail(id: string): Promise<CustomerPayload> {
    const customer = await this.prisma.customer.findUnique({
      where: { id },
      select: this.customerSelect,
    });

    if (!customer || customer.deletedAt) {
      throw new NotFoundException({
        code: ErrorCode.CUSTOMER_NOT_FOUND,
        message: `No se encontró el cliente con id "${id}"`,
        field: 'id',
      });
    }

    return customer;
  }

  private async validateUniquePhone(phone: string, ignoreId?: string) {
    const conflict = await this.prisma.customer.findFirst({
      where: ignoreId ? { phone, NOT: { id: ignoreId } } : { phone },
      select: { id: true },
    });

    if (conflict) {
      throw new ConflictException({
        code: ErrorCode.PHONE_ALREADY_EXISTS,
        message: 'El teléfono ya está registrado',
        field: 'phone',
      });
    }
  }

  async createCustomer(dto: CreateCustomerDto): Promise<CustomerPayload> {
    const normalizedPhone = this.normalizePhone(dto.phone);

    // Validar teléfono único
    const phoneConflict = await this.prisma.customer.findFirst({
      where: { phone: normalizedPhone },
      select: { id: true },
    });

    if (phoneConflict) {
      throw new ConflictException({
        code: ErrorCode.PHONE_ALREADY_EXISTS,
        message: 'El teléfono ya está registrado',
        field: 'phone',
      });
    }

    // Crear cliente
    const customer = await this.prisma.customer.create({
      data: { ...dto, phone: normalizedPhone },
      select: this.customerSelect,
    });

    return customer;
  }

  async updateCustomer(
    id: string,
    dto: UpdateCustomerDto,
  ): Promise<CustomerPayload> {
    const customer = await this.findCustomerOrFail(id);

    const data: Prisma.CustomerUpdateInput = {
      ...dto,
    };

    if (dto.phone) {
      const normalizedPhone = this.normalizePhone(dto.phone);

      if (normalizedPhone !== customer.phone) {
        await this.validateUniquePhone(normalizedPhone, customer.id);
      }

      data.phone = normalizedPhone;
    }

    const updated = await this.prisma.customer.update({
      where: { id: customer.id },
      data, // ✅ aquí sí usas data
      select: this.customerSelect,
    });

    return updated;
  }

  async getCustomerById(id: string): Promise<CustomerPayload> {
    const customer = await this.findCustomerOrFail(id);
    return customer;
  }

  async deleteCustomer(id: string): Promise<{ message: string }> {
    await this.findCustomerOrFail(id);

    await this.prisma.customer.update({
      where: { id },
      data: { deletedAt: new Date() },
    });

    return {
      message: `Cliente con id "${id}" eliminado correctamente`,
    };
  }

  async restoreCustomer(id: string): Promise<CustomerPayload> {
    const customer = await this.prisma.customer.findUnique({
      where: { id },
      select: this.customerSelect,
    });

    if (!customer || !customer.deletedAt) {
      throw new NotFoundException({
        code: ErrorCode.CUSTOMER_NOT_FOUND,
        message: `No se encontró un cliente eliminado con id "${id}"`,
        field: 'id',
      });
    }

    const restored = await this.prisma.customer.update({
      where: { id },
      data: { deletedAt: null },
      select: this.customerSelect,
    });

    return restored;
  }

  async findAllCustomers(
    page: number = PaginationHelper.DEFAULT_PAGE,
    limit: number = PaginationHelper.DEFAULT_LIMIT,
    searchTerm?: string,
    sortByField?: string,
    sortDirection?: 'asc' | 'desc',
  ): Promise<{ data: CustomerPayload[]; meta: any }> {
    const { skip, take } = PaginationHelper.validate(page, limit);

    // Construir cláusula WHERE para búsqueda en nombre, apellido y teléfono
    const whereClause = SearchHelper.buildWhereClause(
      searchTerm,
      ['firstName', 'lastName'], // Campos de búsqueda de texto
      'phone', // Campo de búsqueda numérica
    );

    // Construir cláusula ORDER BY dinámicamente
    const orderBy = this.buildOrderBy(sortByField, sortDirection);

    const [customers, totalFiltered, totalGlobal] = await Promise.all([
      this.prisma.customer.findMany({
        where: whereClause,
        skip,
        take,
        orderBy,
        select: this.customerSelect,
      }),
      this.prisma.customer.count({ where: whereClause }),
      this.prisma.customer.count({ where: { deletedAt: null } }),
    ]);

    return {
      data: customers,
      meta: PaginationHelper.buildMeta(page, limit, totalFiltered, totalGlobal),
    };
  }

  private buildOrderBy(
    sortByField?: string,
    sortDirection: 'asc' | 'desc' = 'asc',
  ) {
    const validFields = [
      'firstName',
      'lastName',
      'phone',
      'createdAt',
      'updatedAt',
    ];
    const field = validFields.includes(sortByField || '')
      ? sortByField
      : 'firstName';

    return [{ [field as string]: sortDirection }];
  }
}
