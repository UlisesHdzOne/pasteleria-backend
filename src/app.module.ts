import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { CustomerModule } from './modules/customer/customer.module';
import { ConfigModule } from '@nestjs/config';
import { AddressModule } from './modules/address/address.module';
import { CakeFlavorModule } from './cake-flavor/cake-flavor.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    CustomerModule,
    AddressModule,
    CakeFlavorModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
