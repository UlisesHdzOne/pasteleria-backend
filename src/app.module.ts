import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { CustomerModule } from './modules/customer/customer.module';
import { ConfigModule } from '@nestjs/config';
import { AddressModule } from './modules/address/address.module';
import { CakeFlavorModule } from './cake-flavor/cake-flavor.module';
import { CakeSizeModule } from './cake-size/cake-size.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    CustomerModule,
    AddressModule,
    CakeFlavorModule,
    CakeSizeModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
