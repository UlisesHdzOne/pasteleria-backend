import { Module } from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressController } from './address.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CustomerModule } from '../customer/customer.module';

@Module({
  imports: [
    PrismaModule,
    CustomerModule, // permite usar el CustomerService dentro de AddressModule
  ],
  controllers: [AddressController],
  providers: [AddressService],
})
export class AddressModule {}
