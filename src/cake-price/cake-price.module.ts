import { Module } from '@nestjs/common';
import { CakePriceService } from './cake-price.service';
import { CakePriceController } from './cake-price.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [CakePriceController],
  providers: [CakePriceService],
})
export class CakePriceModule {}
