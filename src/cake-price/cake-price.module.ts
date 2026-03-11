import { Module } from '@nestjs/common';
import { CakePriceService } from './cake-price.service';
import { CakePriceController } from './cake-price.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CakeFlavorModule } from 'src/cake-flavor/cake-flavor.module';
import { CakeSizeModule } from 'src/cake-size/cake-size.module';

@Module({
  imports: [PrismaModule, CakeFlavorModule, CakeSizeModule],
  controllers: [CakePriceController],
  providers: [CakePriceService],
})
export class CakePriceModule {}
