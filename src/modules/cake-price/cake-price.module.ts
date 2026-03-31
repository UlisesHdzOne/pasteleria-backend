import { Module } from '@nestjs/common';
import { CakePriceService } from './cake-price.service';
import { CakePriceController } from './cake-price.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CakeFlavorModule } from 'src/modules/cake-flavor/cake-flavor.module';
import { CakeSizeModule } from 'src/modules/cake-size/cake-size.module';

@Module({
  imports: [PrismaModule, CakeFlavorModule, CakeSizeModule],
  controllers: [CakePriceController],
  providers: [CakePriceService],
})
export class CakePriceModule {}
