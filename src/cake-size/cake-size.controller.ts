import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CakeSizeService } from './cake-size.service';
import { CreateCakeSizeDto } from './dto/create-cake-size.dto';
import { UpdateCakeSizeDto } from './dto/update-cake-size.dto';

@Controller('cake-size')
export class CakeSizeController {
  constructor(private readonly cakeSizeService: CakeSizeService) {}

  @Post()
  create(@Body() createCakeSizeDto: CreateCakeSizeDto) {
    return this.cakeSizeService.createCakeSize(createCakeSizeDto);
  }

  @Get()
  findAll() {
    return this.cakeSizeService.findAllCakeSize();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cakeSizeService.findOneCakeSize(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCakeSizeDto: UpdateCakeSizeDto,
  ) {
    return this.cakeSizeService.updateCakeSize(id, updateCakeSizeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cakeSizeService.removeCakeSize(id);
  }
}