import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CakeFlavorService } from './cake-flavor.service';
import { CreateCakeFlavorDto } from './dto/create-cake-flavor.dto';
import { UpdateCakeFlavorDto } from './dto/update-cake-flavor.dto';

@Controller('cake-flavor')
export class CakeFlavorController {
  constructor(private readonly cakeFlavorService: CakeFlavorService) {}

  @Post()
  create(@Body() createCakeFlavorDto: CreateCakeFlavorDto) {
    return this.cakeFlavorService.createCakeFlavor(createCakeFlavorDto);
  }

  @Get()
  findAll() {
    return this.cakeFlavorService.findAllCakeFlavor();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cakeFlavorService.findOneCakeFlavor (id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCakeFlavorDto: UpdateCakeFlavorDto,
  ) {
    return this.cakeFlavorService.updateCakeFlavor(id, updateCakeFlavorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cakeFlavorService.removeCakeFlavor(id);
  }
}
