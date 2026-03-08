import { Module } from '@nestjs/common';
import { ExtraService } from './extra.service';
import { ExtraController } from './extra.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ExtraController],
  providers: [ExtraService],
})
export class ExtraModule {}
