import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Body,
  Delete,
} from '@nestjs/common';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';

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

  @Get()
  list(@Param('customerId') customerId: string) {
    return this.addressService.listAddressesByCustomer(customerId);
  }

  @Get(':addressId')
  getById(
    @Param('customerId') customerId: string,
    @Param('addressId') addressId: string,
  ) {
    return this.addressService.getAddressById(customerId, addressId);
  }

  @Patch(':addressId')
  updateAddress(
    @Param('customerId') customerId: string,
    @Param('addressId') addressId: string,
    @Body() updateAddressDto: UpdateAddressDto,
  ) {
    return this.addressService.updateAddress(
      customerId,
      addressId,
      updateAddressDto,
    );
  }

  @Delete(':addressId')
  remove(
    @Param('customerId') customerId: string,
    @Param('addressId') addressId: string,
  ) {
    return this.addressService.deleteAddress(customerId, addressId);
  }

  @Patch(':addressId/default')
  setDefault(
    @Param('customerId') customerId: string,
    @Param('addressId') addressId: string,
  ) {
    return this.addressService.setDefaultAddress(customerId, addressId);
  }
}
