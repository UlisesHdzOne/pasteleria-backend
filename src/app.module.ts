import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { CustomerModule } from './modules/customer/customer.module';
import { ConfigModule } from '@nestjs/config';
import { AddressModule } from './modules/address/address.module';
import { CakeFlavorModule } from './modules/cake-flavor/cake-flavor.module';
import { CakeSizeModule } from './modules/cake-size/cake-size.module';
import { ExtraModule } from './extra/extra.module';
import { CakePriceModule } from './modules/cake-price/cake-price.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    CustomerModule,
    AddressModule,
    CakeFlavorModule,
    CakeSizeModule,
    ExtraModule,
    CakePriceModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
