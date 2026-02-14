import { Controller, Get, Post, Patch, Param, Body } from '@nestjs/common';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';

@Controller('customers/:customerId/addresses')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post()
  create(
    @Param('customerId') customerId: string,
    @Body() createAddressDto: CreateAddressDto,
  ) {
    return this.addressService.createAddress(customerId, createAddressDto);
  }

  @Get(':addressId')
  getById(
    @Param('customerId') customerId: string,
    @Param('addressId') addressId: string,
  ) {
    return this.addressService.getAddressById(customerId, addressId);
  }

  @Patch(':addressId/default')
  setDefault(
    @Param('customerId') customerId: string,
    @Param('addressId') addressId: string,
  ) {
    return this.addressService.setDefaultAddress(customerId, addressId);
  }
}
