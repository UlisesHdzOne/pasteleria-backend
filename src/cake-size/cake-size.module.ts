import { Module } from '@nestjs/common';
import { CakeSizeService } from './cake-size.service';
import { CakeSizeController } from './cake-size.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [CakeSizeController],
  providers: [CakeSizeService],
  exports: [CakeSizeService],
})
export class CakeSizeModule {}
