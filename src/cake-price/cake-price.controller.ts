import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';

import { CakePriceService } from './cake-price.service';
import { CreateCakePriceDto } from './dto/create-cake-price.dto';
import { UpdateCakePriceDto } from './dto/update-cake-price.dto';

@Controller('cake-prices')
export class CakePriceController {
  constructor(private readonly cakePriceService: CakePriceService) {}

  @Post()
  create(@Body() createCakePriceDto: CreateCakePriceDto) {
    return this.cakePriceService.createCakePrice(createCakePriceDto);
  }

  @Get()
  findAll() {
    return this.cakePriceService.findAllCakePrices();
  }

  // ruta específica (debe ir antes de :id)
  @Get('by-flavor-size')
  getByFlavorAndSize(
    @Query('flavorId') flavorId: string,
    @Query('sizeId') sizeId: string,
  ) {
    return this.cakePriceService.getPriceByFlavorAndSize(flavorId, sizeId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cakePriceService.getCakePriceById(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCakePriceDto: UpdateCakePriceDto,
  ) {
    return this.cakePriceService.updateCakePrice(id, updateCakePriceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cakePriceService.deleteCakePrice(id);
  }
}
