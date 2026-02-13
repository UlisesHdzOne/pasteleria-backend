import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customerService.createCustomer(createCustomerDto);
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.customerService.getCustomerById(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ) {
    return this.customerService.updateCustomer(id, updateCustomerDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.customerService.deleteCustomer(id);
  }

  @Get()
  async findAllCustomers() {
    return this.customerService.findAllCustomers();
  }
}
