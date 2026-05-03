import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { FindCustomerQueryDto } from './dto/find-customer-query.dto';

@Controller('api/customer')
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

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customerService.getById(id);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.customerService.delete(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCustomerDto: UpdateCustomerDto) {
    return this.customerService.update(id, updateCustomerDto);
  }
}