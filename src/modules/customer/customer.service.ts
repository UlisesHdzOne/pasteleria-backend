import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CustomerResponse } from './types/customer.response';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer } from '@prisma/client';

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
    const customer = await this.prisma.customer.findUnique({
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
      where: { id, deletedAt: null },
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

  async findAllCustomers(): Promise<CustomerResponse[]> {
    const customers = await this.prisma.customer.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });

    return customers.map((customer) => this.mapToResponse(customer));
  }
}
