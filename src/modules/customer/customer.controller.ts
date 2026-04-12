import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { FindCustomerQueryDto } from './dto/find-customer-query.dto';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customerService.create(createCustomerDto);
  }

  @Get()
  findAll(@Query() query: FindCustomerQueryDto) {
    return this.customerService.findAll(query);
  }
}
