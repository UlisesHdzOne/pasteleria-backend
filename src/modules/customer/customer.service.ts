// customer.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { CustomerResponseDto } from './dto/customer-response.dto';
import { plainToClass } from 'class-transformer';
import { CreateCustomerResponseDto } from './dto/create-customer-response.dto';

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
    return plainToClass(CreateCustomerResponseDto, customer, {
      excludeExtraneousValues: true,
    });
  }
}
