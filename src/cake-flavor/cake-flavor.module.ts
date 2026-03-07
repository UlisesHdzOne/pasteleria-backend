import { Module } from '@nestjs/common';
import { CakeFlavorService } from './cake-flavor.service';
import { CakeFlavorController } from './cake-flavor.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [CakeFlavorController],
  providers: [CakeFlavorService],
})
export class CakeFlavorModule {}
